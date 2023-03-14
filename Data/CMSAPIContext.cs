using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using CMS.API.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace CMS.API.Data
{
    public class CMSAPIContext : IdentityDbContext<User, Role, int, IdentityUserClaim<int>,
        UserRole, IdentityUserLogin<int>, IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public CMSAPIContext (DbContextOptions<CMSAPIContext> options)
            : base(options)
        {
        }

        public DbSet<Value> Values { get; set; }
        public DbSet<Address> Address { get; set; }
        public DbSet<Cart> Carts { get; set; }
        public DbSet<CartDetail> CartDetails { get; set; }
        public DbSet<Channel> Channels { get; set; }
        public DbSet<ChannelGenre> ChannelGenres { get; set; }
        public DbSet<ChannelLanguage> ChannelLanguages { get; set; }
        public DbSet<Plan> Plans { get; set; }
        public DbSet<PlanDetial> PlanDetials { get; set; }
        public DbSet<PaymentStatus> PaymentStatus { get; set; }
        public DbSet<Vendors> Vendors { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<UserRole>(userRole =>
            {
                userRole.HasKey(ur => new { ur.UserId, ur.RoleId });

                userRole.HasOne(ur => ur.Role)
                    .WithMany(r => r.UserRoles)
                    .HasForeignKey(ur => ur.RoleId)
                    .IsRequired();

                userRole.HasOne(ur => ur.User)
                    .WithMany(r => r.UserRoles)
                    .HasForeignKey(ur => ur.UserId)
                    .IsRequired();
            });

            builder.Entity<User>()
                .HasOne(u => u.Address)
                .WithOne(a => a.User)
                .HasForeignKey<Address>(u => u.UserId);
        }
    }
}
