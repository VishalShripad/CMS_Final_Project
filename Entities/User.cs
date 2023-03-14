using Microsoft.AspNetCore.Identity;

namespace CMS.API.Entities
{
    public class User : IdentityUser<int>
    {
        public string DisplayName { get; set; }
        public DateTime Created { get; set; }
        public bool IsActive { get; set; }
        public Address Address { get; set; }
        public virtual ICollection<UserRole> UserRoles { get; set; }
    }
}
