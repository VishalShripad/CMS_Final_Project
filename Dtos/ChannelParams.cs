namespace CMS.API.Dtos
{
    public class ChannelParams
    {
        private const int MaxPageSize = 50;
        public int PageNumber { get; set; } = 1;
        private int _pageSize = 10;
        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
        }

        public int? GenreId { get; set; }
        public int? LanguageId { get; set; }
        public int? VendorId { get; set; }
        public string? Sort { get; set; }
        private string? _search;
        public string? Search
        {
            get => _search;
            set => _search = value;
        }
    }
}
