using Microsoft.AspNetCore.Identity;

namespace CMS.API.Entities
{
    public class Role : IdentityRole<int>
    {
        public virtual ICollection<UserRole> UserRoles { get; set; }
    }
}
