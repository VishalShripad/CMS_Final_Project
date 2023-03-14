using CMS.API.Entities;

namespace CMS.API.Dtos
{
    public class ChannelDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string PictureUrl { get; set; }
        public string ChannelGenre { get; set; }
        public string ChannelLanguage { get; set; }
        public int NumberOfUsers { get; set; }
        public int VendorId { get; set; }
    }
}
