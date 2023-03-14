using System.Runtime.CompilerServices;

namespace CMS.API.Dtos
{
    public class CartToReturnDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public bool IsDeleted { get; set; }
        public List<CartDetailsDto> CartDetails { get; set; }
        public decimal SubTotal { get; set; }
        public int TotalCount { get; set; }
    }
}
