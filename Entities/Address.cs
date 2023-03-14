﻿using System.ComponentModel.DataAnnotations;

namespace CMS.API.Entities
{
    public class Address
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string ZipCode { get; set; }
        public string PhoneNumber { get; set; }

        [Required]
        public int UserId { get; set; }
        public User User { get; set; }
    }
}
