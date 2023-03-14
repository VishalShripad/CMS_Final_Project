namespace CMS.API.Dtos
{
    public class UserWIthPlanDto
    {
        public int Id { get; set; }
        public string DisplayName { get; set; }
        public string Email { get; set; }
        public DateTime Created { get; set; }
        public AddressDto Address { get; set; }
        public List<PlanDto> Plans { get; set; }
    }
}
