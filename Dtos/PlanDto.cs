namespace CMS.API.Dtos
{
    public class PlanDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int Status { get; set; }
        public DateTime CreatedAt { get; set; }
        public List<PlanDetailsDto> PlanDetail { get; set; }
        public decimal SubTotal { get; set; }
        public bool IsPaymentSuccess { get; set; }
    }
}
