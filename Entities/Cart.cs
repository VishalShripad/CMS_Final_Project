namespace CMS.API.Entities
{
    public class Cart
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public bool IsDeleted { get; set; } = false;
        public ICollection<CartDetail> CartDetails { get; set; }
    }
}
