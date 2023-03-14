using AutoMapper;
using CMS.API.Dtos;
using CMS.API.Entities;
using CMS.API.Helper;
using CMS.API.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace CMS.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChannelController : ControllerBase
    {
        private readonly IChannelRepository _channelRepository;
        private readonly IMapper _mapper;

        public ChannelController(IChannelRepository channelRepository, IMapper mapper)
        {
            _channelRepository = channelRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetChannels([FromQuery] ChannelParams channelParams)
        {
            var channels = await _channelRepository.GetChannelsAsync(channelParams);

            var channelToReturn = new List<ChannelDto>();

            foreach (var channel in channels)
            {
                var channelDto = new ChannelDto
                {
                    Id = channel.Id,
                    Name = channel.Name,
                    Description = channel.Description,
                    Price = channel.Price,
                    ChannelGenre = channel.ChannelGenre.Name,
                    ChannelLanguage = channel.ChannelLanguage.Name,
                    PictureUrl = channel.PictureUrl
                };
                channelToReturn.Add(channelDto);
            }

            //var channelToReturn = _mapper.Map<IEnumerable<ChannelDto>>(channels);

            Response.AddPagination(channels.CurrentPage, channels.PageSize, channels.TotalCount, channels.TotalPages);

            return Ok(channelToReturn);
        }

        [HttpGet("{id}", Name = "GetProduct")]
        public async Task<IActionResult> GetChannelById(int id)
        {
            var channel = await _channelRepository.GetChannelByIdAsync(id);

            if (channel != null)
                return Ok(_mapper.Map<ChannelDto>(channel));

            return NotFound();
        }

        [HttpGet("genres")]
        public async Task<ActionResult<IReadOnlyList<ChannelGenre>>> GetChannelGenres()
        {
            return Ok(await _channelRepository.GetChannelGenreAsync());
        }

        [HttpGet("languages")]
        public async Task<ActionResult<IReadOnlyList<ChannelLanguage>>> GetChannelLanguages()
        {
            return Ok(await _channelRepository.GetChannelLanguagesAsync());
        }

        [HttpGet("vendors")]
        public async Task<ActionResult<IReadOnlyList<Vendors>>> GetVendors()
        {
            return Ok(await _channelRepository.GetVendorsAsync());
        }
    }
}
