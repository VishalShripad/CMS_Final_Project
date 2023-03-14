using CMS.API.Helper;

namespace CMS.API.Entities
{
    public class Plan
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public decimal SubTotal { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public ICollection<PlanDetial> PlanDetail { get; set; }
        public bool IsPaymentSuccess { get; set; }
        public int Status { get; set; }
    }
}
