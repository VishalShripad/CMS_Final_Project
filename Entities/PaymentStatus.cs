using System.ComponentModel.DataAnnotations.Schema;

namespace CMS.API.Entities
{
    [Table("PaymentStatus")]
    public class PaymentStatus
    {
        public int Id { get; set; }
        public int PlanId { get; set; }
        public int UserId { get; set; }
        public string ModeOfPayment { get; set; }
        public DateTime CreatedAt { get; set; }
        public bool IsSuccess { get; set; }
    }
}
