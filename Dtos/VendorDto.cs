namespace CMS.API.Dtos
{
    public class VendorDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool IsActive { get; set; }
        public List<ChannelDto> Channels { get; set; }
        public decimal TotalPrice { get; set; }
        public int TotalUserCount { get; set; }
    }
}
