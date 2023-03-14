using System.ComponentModel.DataAnnotations;

namespace CMS.API.Dtos
{
    public class ResetPasswordDto
    {
        [Required]
        [StringLength(8, MinimumLength = 4, ErrorMessage = "Password should be between 4 and 8 characters.")]
        public string Password { get; set; }

        [Required]
        [Compare("Password", ErrorMessage = "The password and confirm password do not match.")]
        public string ConfirmPassword { get; set; }
        public string? Email { get; set; }
        public string? Token { get; set; }
    }
}
