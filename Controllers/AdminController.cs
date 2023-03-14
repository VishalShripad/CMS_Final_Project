using AutoMapper;
using CMS.API.Data;
using CMS.API.Dtos;
using CMS.API.Entities;
using CMS.API.Helper;
using CMS.API.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel;
using System.Security.Claims;

namespace CMS.API.Controllers
{
    [Authorize(policy: "RequireAdminRole")]
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly IUsersRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IAdminRepository _adminRepository;
        private readonly IEmailService _emailService;

        public AdminController(IUsersRepository userRepository, IMapper mapper,
            IAdminRepository adminRepository, IEmailService emailService)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _adminRepository = adminRepository;
            _emailService = emailService;
        }

        [HttpGet("getallusers")]
        public async Task<IActionResult> GetUsers([FromQuery] UserParams userParams)
        {
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            //var userFromRepo = await _userRepo.GetUser(currentUserId, true);

            userParams.UserId = currentUserId;

            var users = await _userRepository.GetUsers(userParams);

            var usersToReturn = _mapper.Map<IEnumerable<UserForListDto>>(users);

            foreach (var user in usersToReturn)
            {
                var plan = await GetLatestPlanOfUser(user.Id);

                if (plan == null)
                {
                    user.PlanStatus = 0;
                    user.isPlanToDeactivate = false;
                    user.RemainingDays = 99;
                }
                else
                {
                    user.PlanId = plan.Id;
                    user.PlanStatus = plan.Status;
                    TimeSpan daysToEnd = (TimeSpan)(plan.EndDate - DateTime.UtcNow);
                    if(daysToEnd.Days > 0)
                    {
                        user.isPlanToDeactivate = false;
                        user.RemainingDays = daysToEnd.Days;
                    } else
                    {
                        user.isPlanToDeactivate = true;
                        user.RemainingDays = daysToEnd.Days;
                    }
                }
            }

            usersToReturn = usersToReturn.OrderBy(x => x.RemainingDays);

            Response.AddPagination(users.CurrentPage, users.PageSize, users.TotalCount, users.TotalPages);

            return Ok(usersToReturn);
        }

        //[HttpGet("{id}", Name = "GetUser")]
        //public async Task<IActionResult> GetUser(int id)
        //{
        //    var isCurrentUser = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value) == id;

        //    var user = await _userRepository.GetUser(id, isCurrentUser);

        //    var userToReturn = _mapper.Map<UserForDetailedDto>(user);

        //    return Ok(userToReturn);
        //}

        [HttpGet("getvendors")]
        public async Task<ActionResult<IReadOnlyList<VendorDto>>> GetVendors()
        {
            var vendorList = await _adminRepository.GetVendors();

            var vendorToReturn = _mapper.Map<IReadOnlyList<VendorDto>>(vendorList);

            foreach (var item in vendorToReturn)
            {
                item.TotalPrice = item.Channels.Sum(x => x.Price);
            }

            return Ok(vendorToReturn);
        }

        [HttpGet("activatePlan/{userId}/plan/{planId}")]
        public async Task<IActionResult> DeactivatePlan(int userId, int planId)
        {
            string email = _adminRepository.GetEmailOfUser(userId);

            if (!IsPlanOfUser(userId, planId))
                return BadRequest("This plan does not belong to user");

            string status = await _adminRepository.DeactivateUserPlan(userId, planId);

            if(status == "Active")
                return BadRequest("No Plan exists to deactivate.");

            if (status == "NotToActive")
                return Ok("No Plan to activate.");

            if (status == "success")
            {
                var newMessage = new Message
                (
                    new string[] { email },
                    "Your new plan is activated"
                );

                EmailNotification(newMessage);
            }

            return Ok(status);
        }

        [HttpGet("userWithPlan/{userId}")]
        public async Task<IActionResult> GetUserWithPlan(int userId)
        {
            var userWithPlan = await _adminRepository.GetUserWithPlan(userId);

            return Ok(userWithPlan);
        }

        private bool IsPlanOfUser(int userId, int planId)
        {
            return _adminRepository.IsPlanForUser(userId, planId);
        }
        private async Task<IActionResult> EmailNotification(Message message)
        {
            _emailService.SendEmail(message);
            return Ok();
        }

        private async Task<Plan> GetLatestPlanOfUser(int userId)
        {
            return await _adminRepository.GetLatestUserPlan(userId);
        }

    }
}
