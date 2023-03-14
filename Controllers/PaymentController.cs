using AutoMapper;
using CMS.API.Dtos;
using CMS.API.Entities;
using CMS.API.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace CMS.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IPaymentRepository _paymentRepository;
        private readonly ICartRepository _cartRepository;
        private readonly IConfiguration _config;
        private readonly IPlanRepository _planRepository;
        //private readonly IEmailService _emailService;

        public PaymentController(IMapper mapper, IPaymentRepository paymentRepository,
            ICartRepository cartRepository, IConfiguration config, IPlanRepository planRepository
            /*,IEmailService emailService*/)
        {
            _mapper = mapper;
            _paymentRepository = paymentRepository;
            _cartRepository = cartRepository;
            _config = config;
            _planRepository = planRepository;
            //_emailService = emailService;
        }

        [HttpGet("checkout")]
        public async Task<ActionResult<PlanDto>> Checkout()
        {
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var cart = await _cartRepository.GetCart(currentUserId);

            if (cart == null)
                return NotFound("Cart is empty! cannot checkout empty cart.");

            if (await _paymentRepository.CheckForExistingActivePlan(currentUserId))
            {
                return StatusCode(StatusCodes.Status400BadRequest, new ApiResponse
                {
                    Status = "Error",
                    Message = "Active plan already exist, cannot create new plan until current plan expires."
                });
            }

            if(await _paymentRepository.CheckForExistingUnpaidPlan(currentUserId))
            {
                return StatusCode(StatusCodes.Status400BadRequest, new ApiResponse
                {
                    Status = "Error",
                    Message = "Cannot create new plan, if previous plan payment is pending."
                });
            }

            var plan = await _paymentRepository.Checkout(currentUserId);

            var planToReturn = _mapper.Map<PlanDto>(plan);

            if (planToReturn == null)
                return BadRequest("Error while check out.");

            return Ok(planToReturn);
        }

        [HttpPost("makepayment")]
        public async Task<IActionResult> MakePayment([FromBody] PaymentDto paymentDto)
        {
            bool isNoOtherActivePlan = false;

            bool isSuccess = Convert.ToBoolean(_config.GetSection("AppSettings:DoPaymentSuccess").Value);

            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var email = User.FindFirst(ClaimTypes.Email).Value;

            //var newMessage = new Message
            //(
            //    new string[] { email },
            //    string.Empty
            //);

            var plan = await _planRepository.GetPlanByIdAsync(paymentDto.PlanId);

            if (plan == null || plan.UserId != currentUserId)
                return BadRequest();

            var isPaymentSuccess = await _paymentRepository.MakePayment(paymentDto, isSuccess, currentUserId);

            if (!isPaymentSuccess)
            {
                // Send mail on payment failed.
                //newMessage.Content = "Your last payment was unsuccessful, please try again after some time.";
                //EmailNotification(newMessage);

                return StatusCode(StatusCodes.Status401Unauthorized,
                    new ApiResponse
                    {
                        Status = "Error",
                        Message = "Payment failed, please try after some time."
                    });
            }

            // Send email on payment success
            //newMessage.Content = "Your payment to CMS is successful.";
            //EmailNotification(newMessage);


            isNoOtherActivePlan =  await IfNoActivePlan(plan);

            // Send mail on plan active.
            //if (isNoOtherActivePlan)
            //{
            //    newMessage.Content = "Your plan is now active.";
            //    EmailNotification(newMessage);
            //}

            return Ok(isPaymentSuccess);
        }

        private async Task<bool> IfNoActivePlan(Plan plan)
        {
            return await _paymentRepository.MakePlanActive(plan);
        }

        //private async Task<IActionResult> EmailNotification(Message message)
        //{
        //    _emailService.SendEmail(message);
        //    return Ok();
        //}
    }
}
