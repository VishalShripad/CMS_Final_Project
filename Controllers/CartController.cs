using AutoMapper;
using CMS.API.Dtos;
using CMS.API.Entities;
using CMS.API.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace CMS.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class CartController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly ICartRepository _cartRepository;
        private readonly IChannelRepository _channelRepository;

        public CartController(IMapper mapper, ICartRepository cartRepository,
            IChannelRepository channelRepository)
        {
            _mapper = mapper;
            _cartRepository = cartRepository;
            _channelRepository = channelRepository;
        }

        [HttpGet("addChannel/{channelid}", Name = "AddChannelToCart")]
        public async Task<IActionResult> AddItemToCart(int channelId)
        {
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            if(!await IsChannelExist(channelId))
                return NotFound();

            // check if channel already exist in cart
            if (await ChannelInCart(channelId, currentUserId))
                return StatusCode(StatusCodes.Status403Forbidden,
                    new ApiResponse
                    {
                        Status = "Error",
                        Message = "Channel already exist in cart."
                    });

            var updateCart = await _cartRepository.AddItem(channelId, currentUserId);

            return Ok(updateCart);
        }

        private async Task<bool> ChannelInCart(int channelId, int userId)
        {
            var cart = await _cartRepository.GetCart(userId);

            if (cart == null)
                return false;

            return await _cartRepository.ChannelInCart(channelId, cart.Id);
        }

        [HttpGet("removeChannel/{channelId}", Name = "RemoveChannelFromCart")]
        public async Task<IActionResult> RemoveItemFromCart(int channelId)
        {
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            if (!await IsChannelExist(channelId))
                return NotFound();

            if (!await ChannelInCart(channelId, currentUserId))
            {
                return StatusCode(StatusCodes.Status403Forbidden,
                    new ApiResponse
                    {
                        Status = "Error",
                        Message = "Channel is not present in your cart."
                    });
            }

            var updateCart = await _cartRepository.RemoveItem(channelId, currentUserId);

            return Ok(updateCart);
        }

        [HttpGet("GetUserCart")]
        public async Task<ActionResult<Cart>> GetCart()
        {
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var cart = await _cartRepository.GetUserCart(currentUserId);

            var cartToReturn = _mapper.Map<Cart, CartToReturnDto>(cart);

            if (cartToReturn == null)
            {
                return StatusCode(StatusCodes.Status404NotFound,
                    new ApiResponse
                    {
                        Status = "Success",
                        Message = "Cart is empty."
                    });
            }

            cartToReturn.SubTotal = cartToReturn.CartDetails.Sum(x => x.Price);
            cartToReturn.TotalCount = cartToReturn.CartDetails.Count();
            
            return Ok(cartToReturn);
        }
        
        private async Task<bool> IsChannelExist(int channelId)
        {
            var channel = await _channelRepository.GetChannelByIdAsync(channelId);
            
            if (channel == null)
                return false;
            return true;
        }
    }
}
