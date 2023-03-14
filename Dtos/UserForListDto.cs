namespace CMS.API.Dtos
{
    public class UserForListDto
    {
        public int Id { get; set; }
        public string DisplayName { get; set; }
        public string Email { get; set; }
        public DateTime Created { get; set; }
        public AddressDto Address { get; set; }
        public int PlanStatus { get; set; }
        public int RemainingDays { get; set; }
        public bool isPlanToDeactivate { get; set; }
        public int PlanId { get; set; }
    }
}
