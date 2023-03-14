namespace CMS.API.Entities
{
    public class Channel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string PictureUrl { get; set; }
        public ChannelGenre ChannelGenre { get; set; }
        public int ChannelGenreId { get; set; }
        public ChannelLanguage ChannelLanguage { get; set; }
        public int ChannelLanguageId { get; set; }
        public List<PlanDetial> PlanDetail { get; set; }
        public List<CartDetail> CartDetail { get; set; }
        public int VendorsId { get; set; }

    }
}
