namespace CMS.API.Dtos
{
    public class CartDetailsDto
    {
        public int Id { get; set; }
        public int ChannelId { get; set; }
        public string ChannelName { get; set; }
        public string PictureUrl { get; set; }
        public decimal Price { get; set; }
        public string Genre { get; set; }
        public string Language { get; set; }
    }
}
