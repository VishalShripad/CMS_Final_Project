using System.ComponentModel.DataAnnotations;

namespace CMS.API.Dtos
{
    public class ChangePasswordDto
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string OldPassword { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        [Compare("Password", ErrorMessage = "The password and confirm password do not match.")]
        public string ConfirmPassword { get; set; }
    }
}
