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
    public class PlanController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IPlanRepository _planRepository;

        public PlanController(IMapper mapper, IPlanRepository planRepository)
        {
            _mapper = mapper;
            _planRepository = planRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetPlansForUser([FromQuery] PlanParams planParams)
        {
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var plans = await _planRepository.GetAllPlansForUserAsync(planParams, currentUserId);

            if (plans == null || plans.Count() == 0)
            {
                return StatusCode(StatusCodes.Status400BadRequest,
                    new ApiResponse
                    {
                        Status = "Error",
                        Message = "Nothing to show here."
                    });
            }

            var plansToReturn = _mapper.Map<IEnumerable<PlanDto>>(plans);

            return Ok(plansToReturn);
        }

        [HttpGet("{planid}")]
        public async Task<IActionResult> GetPlanById(int planId)
        {
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var plan = await _planRepository.GetPlanByIdAsync(planId);

            if (plan == null)
                return BadRequest("Invalid plan selected");

            if (currentUserId != plan.UserId)
                return Unauthorized();

            var planToReturn = _mapper.Map<PlanDto>(plan);

            return Ok(planToReturn);
        }
    }
}
