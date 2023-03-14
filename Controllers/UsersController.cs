using AutoMapper;
using CMS.API.Dtos;
using CMS.API.Entities;
using CMS.API.Helper;
using CMS.API.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace CMS.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUsersRepository _userRepo;
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;

        public UsersController(IUsersRepository userRepo, IMapper mapper, UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _userRepo = userRepo;
            _mapper = mapper;
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpGet("all", Name = "GetAllUsers")]
        public async Task<IActionResult> GetUsers([FromQuery]UserParams userParams)
        {
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            //var userFromRepo = await _userRepo.GetUser(currentUserId, true);

            userParams.UserId = currentUserId;

            var users = await _userRepo.GetUsers(userParams);

            var usersToReturn = _mapper.Map<IEnumerable<UserForListDto>>(users);

            Response.AddPagination(users.CurrentPage, users.PageSize, users.TotalCount, users.TotalPages);

            return Ok(usersToReturn);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            var isCurrentUser = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value) == id;

            var role = User.FindFirst(ClaimTypes.Role).Value;

            if(!isCurrentUser || role.ToLower() != "admin")
            {
                return Unauthorized();
            }

            var user = await _userRepo.GetUser(id, isCurrentUser);

            var userToReturn = _mapper.Map<UserForDetailedDto>(user);

            return Ok(userToReturn);
        }

        [HttpGet]
        public async Task<IActionResult> GetUser()
        {
            var isCurrentUser = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var user = await _userRepo.GetUser(isCurrentUser, true);

            var userToReturn = _mapper.Map<UserForDetailedDto>(user);

            return Ok(userToReturn);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, UserForUpdateDto userForUpdateDto)
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var userFromRepo = await _userRepo.GetUser(id, true);

            _mapper.Map(userForUpdateDto, userFromRepo);

            if (await _userRepo.SaveAll())
                return NoContent();

            throw new Exception($"Updating user {id} failed on save");
        }

        [HttpGet("address")]
        public async Task<ActionResult<AddressDto>> GetUserAddress()
        {
            int id = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var user = await _userManager.Users.Include(a => a.Address).SingleOrDefaultAsync(x => x.Id == id);

            //var user = await _userRepo.GetUser(id, true);

            var address = _mapper.Map<Address, AddressDto>(user.Address);

            if (address == null)
                return Ok(new AddressDto { });
            return address;
        }

        [HttpPut("address")]
        [Authorize(Roles = "Member")]
        public async Task<ActionResult<AddressDto>> UpdateUserAddress(AddressDto addressDto)
        {
            int id = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var user = await _userRepo.GetUserWithAddress(id);

            user.Address = _mapper.Map<AddressDto, Address>(addressDto);

            var result = await _userManager.UpdateAsync(user);

            if (result.Succeeded) return Ok(_mapper.Map<Address, AddressDto>(user.Address));

            return BadRequest("Problem updating the user");
        }
    }
}
