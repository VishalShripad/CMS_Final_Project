using AutoMapper;
using CMS.API.Dtos;
using CMS.API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using NETCore.MailKit.Core;

namespace CMS.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        private readonly IConfiguration _config;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IMapper _mapper;
        private readonly IEmailService _emailService;

        public AuthController(IConfiguration config, UserManager<User> userManager, SignInManager<User> signInManager,
            IMapper mapper, IEmailService emailService)
        {
            _config = config;
            _userManager = userManager;
            _signInManager = signInManager;
            _mapper = mapper;
            _emailService = emailService;
        }


        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
        {
            if (CheckEmailExistsAsync(userForRegisterDto.Email).Result.Value)
            {
                return StatusCode(StatusCodes.Status403Forbidden,
                    new ApiResponse
                    {
                        Status = "Error",
                        Message = "Email is already in use"
                    });
            }

            var userToCreate = new User
            {
                DisplayName = userForRegisterDto.DisplayName,
                Email = userForRegisterDto.Email,
                UserName = userForRegisterDto.Email,
                Created = userForRegisterDto.Created
            };

            var result = await _userManager.CreateAsync(userToCreate, userForRegisterDto.Password);

            //var userToReturn = _mapper.Map<UserForDetailedDto>(userToCreate);

            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(userToCreate, "Member");

                //var NewMessage = new Message
                //(
                //    new string[] { userToCreate.Email },
                //    "<h1>Thank you for choosing CMS. Your CMS account is created.</h1>"
                //);

                //EmailNotification(NewMessage);

                //var adm = await _userManager.GetUsersInRoleAsync("ADMIN");
                //var adminEmail = adm.FirstOrDefault().Email;

                //var adminMessage = new Message
                //(
                //    new string[] { adminEmail },
                //    $"User with email {userToCreate.Email} is now registered with CMS."
                //);

                //EmailNotification(adminMessage);

                return StatusCode(StatusCodes.Status200OK,
                    new ApiResponse
                    {
                        Status = "Ok",
                        Message = "User created successfully"
                    });
            }

            return BadRequest();
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto userForLoginDto)
        {
            var user = await _userManager.FindByEmailAsync(userForLoginDto.Email);

            if (user == null)
            {
                return StatusCode(StatusCodes.Status401Unauthorized,
                        new ApiResponse
                        {
                            Status = "Error",
                            Message = "User with this email id does not exist."
                        });
            }

            var result = await _signInManager.CheckPasswordSignInAsync(user, userForLoginDto.Password, false);

            if (result.Succeeded)
            {
                //var appUser = _mapper.Map<UserForListDto>(user);

                return Ok(new UserDto
                {
                    Email = user.Email,
                    Token = GenerateJwtToken(user).Result,
                    DisplayName = user.DisplayName
                });
            }

            return StatusCode(StatusCodes.Status401Unauthorized,
                    new ApiResponse
                    {
                        Status = "Error",
                        Message = "Email or password is wrong"
                    });
        }

        public async Task<ActionResult<bool>> CheckEmailExistsAsync([FromQuery] string email)
        {
            return await _userManager.FindByEmailAsync(email) != null;
        }


        private async Task<string> GenerateJwtToken(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.GivenName, user.DisplayName),
                new Claim(ClaimTypes.Email, user.Email)
            };

            var roles = await _userManager.GetRolesAsync(user);

            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }


        [HttpGet("reset-password")]
        public async Task<IActionResult> ResetPasswrd(string token, string email)
        {
            var model = new ResetPasswordDto
            {
                Email = email,
                Token = token
            };

            return Ok(new { model });
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDto resetPasswordDto)
        {
            var user = await _userManager.FindByEmailAsync(resetPasswordDto.Email);

            if (user == null)
                return BadRequest();

            var resetResult = await _userManager.ResetPasswordAsync(user, resetPasswordDto.Token, resetPasswordDto.Password);
            if (!resetResult.Succeeded)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new ApiResponse
                {
                    Status = "Error",
                    Message = resetResult.Errors.FirstOrDefault().Description
                });
            }

            return Ok("Password reset successful");
        }

        [HttpPost("change-password")]
        public async Task<IActionResult> changePassword([FromBody] ChangePasswordDto changePasswordDto)
        {
            var user = await _userManager.FindByEmailAsync(changePasswordDto?.Email);

            if (user == null)
                return BadRequest();

            var result = await _userManager.ChangePasswordAsync(user, changePasswordDto.OldPassword, changePasswordDto.Password);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return Ok("Password reset successful");
        }
    }
}

        //private async Task<IActionResult> EmailNotification(Message message)
        //{
        //    _emailService.SendEmail(message);
        //    return Ok();
        //}


   
