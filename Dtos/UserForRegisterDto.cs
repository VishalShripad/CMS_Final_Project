using System.ComponentModel.DataAnnotations;

namespace CMS.API.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string DisplayName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [StringLength(8, MinimumLength = 4, ErrorMessage = "Password should be between 4 and 8 characters.")]
        public string Password { get; set; }
        public DateTime Created { get; set; }
        public UserForRegisterDto()
        {
            Created = DateTime.UtcNow;
        }
    }
}
