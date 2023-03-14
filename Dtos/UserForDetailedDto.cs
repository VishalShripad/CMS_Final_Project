namespace CMS.API.Dtos
{
    public class UserForDetailedDto
    {
        public int Id { get; set; }
        public string DisplayName { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public AddressDto Address { get; set; }
        public DateTime Created { get; set; }
    }
}
