namespace CMS.API.Dtos
{
    public class PaymentDto
    {
        public int PlanId { get; set; }
        public string ModeOfPayment { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
