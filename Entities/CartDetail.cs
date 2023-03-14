﻿namespace CMS.API.Entities
{
    public class CartDetail
    {
        public int Id { get; set; }
        public int ChannelId { get; set; }
        public int CartId { get; set; }
        public string ChannelName { get; set; }
        public string PictureUrl { get; set; }
        public decimal Price { get; set; }
        public string Genre { get; set; }
        public string Language { get; set; }
    }
}
