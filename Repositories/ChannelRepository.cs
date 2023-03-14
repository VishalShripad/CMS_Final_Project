using CMS.API.Data;
using CMS.API.Dtos;
using CMS.API.Entities;
using CMS.API.Helper;
using Microsoft.EntityFrameworkCore;

namespace CMS.API.Repositories
{
    public class ChannelRepository : IChannelRepository
    {
        private readonly CMSAPIContext _context;

        public ChannelRepository(CMSAPIContext context)
        {
            _context = context;
        }

        public async Task<ChannelDto> GetChannelByIdAsync(int id)
        {
            var channel = await _context.Channels
                .Include(x => x.ChannelGenre)
                .Include(x => x.ChannelLanguage)
                .SingleOrDefaultAsync(c => c.Id == id);

            var channelDto = new ChannelDto();

            channelDto.Id = id;
            channelDto.Name = channel.Name;
            channelDto.Description = channel.Description;
            channelDto.Price = channel.Price;
            channelDto.PictureUrl = channel.PictureUrl;
            channelDto.ChannelGenre = channel.ChannelGenre.Name;
            channelDto.ChannelLanguage = channel.ChannelLanguage.Name;

            return channelDto;
        }

        public async Task<PagedList<Channel>> GetChannelsAsync(ChannelParams channelParams)
        {
            var channels = _context.Channels
                .Include(x => x.ChannelGenre)
                .Include(x => x.ChannelLanguage)
                .AsQueryable();
            
            if (!string.IsNullOrWhiteSpace(channelParams.Search))
                channels = channels.Where(x => x.Name.Contains(channelParams.Search));

            if (channelParams.GenreId.HasValue)
                channels = channels.Where(x => x.ChannelGenreId == channelParams.GenreId);

            if (channelParams.LanguageId.HasValue)
                channels = channels.Where(x => x.ChannelLanguageId == channelParams.LanguageId);

            if (channelParams.VendorId.HasValue)
                channels = channels.Where(x=> x.VendorsId == channelParams.VendorId);

            if (!string.IsNullOrWhiteSpace(channelParams.Sort))
            {
                switch(channelParams.Sort)
                {
                    case "descending":
                        channels = channels.OrderByDescending(x => x.Price);
                        break;
                    case "ascending":
                        channels = channels.OrderBy(x => x.Price);
                        break;
                    default:
                        channels = channels.OrderBy(x => x.Name);
                        break;
                }
            }

            return await PagedList<Channel>.CreteAsync(channels, channelParams.PageNumber, channelParams.PageSize);
        }

        public async Task<IReadOnlyList<ChannelLanguage>> GetChannelLanguagesAsync()
        {
            return await _context.ChannelLanguages.ToListAsync();
        }


        public async Task<IReadOnlyList<ChannelGenre>> GetChannelGenreAsync()
        {
            return await _context.ChannelGenres.ToListAsync();
        }

        public async Task<IReadOnlyList<Vendors>> GetVendorsAsync()
        {
            return await _context.Vendors.ToListAsync();
        }
    }
}
