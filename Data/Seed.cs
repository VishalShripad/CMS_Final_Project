using CMS.API.Entities;
using Microsoft.AspNetCore.Identity;

namespace CMS.API.Data
{
    public class Seed
    {
        public static void SeedUsers(UserManager<User> userManager, RoleManager<Role> roleManager)
        {
            if (!userManager.Users.Any())
            {
                // create some roles
                var roles = new List<Role>
                {
                    new Role{Name = "Member"},
                    new Role{Name = "Admin"}
                };

                foreach (var role in roles)
                {
                    roleManager.CreateAsync(role).Wait();
                }

                // create admin user

                var adminUser = new User
                {
                    DisplayName = "Admin",
                    Email = "admin@test.com",
                    UserName = "admin@test.com",
                    Address = new Address
                    {
                        FirstName = "Admin",
                        LastName = string.Empty,
                        Street = "Gandhi marg",
                        City = "Mumbai",
                        State = "MH",
                        ZipCode = "400001",
                        PhoneNumber = "123456789"
                    }
                };

                var result = userManager.CreateAsync(adminUser, "Password").Result;

                if (result.Succeeded)
                {
                    var admin = userManager.FindByEmailAsync("admin@test.com").Result;
                    userManager.AddToRoleAsync(admin, "Admin").Wait();
                }
            }
        }
    }
}