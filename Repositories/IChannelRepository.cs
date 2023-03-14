using CMS.API.Dtos;
using CMS.API.Entities;
using CMS.API.Helper;

namespace CMS.API.Repositories
{
    public interface IChannelRepository
    {
        Task<ChannelDto> GetChannelByIdAsync(int id);
        Task<PagedList<Channel>> GetChannelsAsync(ChannelParams channelParams);
        Task<IReadOnlyList<ChannelGenre>> GetChannelGenreAsync();
        Task<IReadOnlyList<ChannelLanguage>> GetChannelLanguagesAsync();
        Task<IReadOnlyList<Vendors>> GetVendorsAsync();
    }
}
