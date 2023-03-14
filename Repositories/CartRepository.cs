using CMS.API.Data;
using CMS.API.Dtos;
using CMS.API.Entities;
using CMS.API.Helper;
using CMS.API.Data;
using Microsoft.EntityFrameworkCore;
using System.Runtime.InteropServices;

namespace CMS.API.Repositories
{
    public class CartRepository : ICartRepository
    {
        public readonly CMSAPIContext _context;

        public CartRepository(CMSAPIContext context)
        {
            _context = context;
        }

        public async Task<bool> AddItem(int ChannleId, int userId)
        {
            var transaction = _context.Database.BeginTransaction();

            try
            {
                var cart = await GetCart(userId);

                if (cart == null)
                {
                    cart = new Cart
                    {
                        UserId = userId
                    };
                    _context.Carts.Add(cart);
                }
                _context.SaveChanges();

                // cart details
                var cartItems = _context.CartDetails.
                    FirstOrDefault(x=>x.CartId == cart.Id && x.ChannelId == ChannleId);

                if (cartItems == null)
                {
                    var channel = _context.Channels.
                        Include(c=>c.ChannelGenre)
                        .Include(c=>c.ChannelLanguage)
                        .Where(x=>x.Id == ChannleId)
                        .FirstOrDefault();

                    cartItems = new CartDetail
                    {
                        ChannelId = ChannleId,
                        CartId = cart.Id,
                        Price = channel.Price,
                        ChannelName = channel.Name,
                        Genre = channel.ChannelGenre.Name,
                        Language = channel.ChannelLanguage.Name,
                        PictureUrl = channel.PictureUrl
                    };
                    _context.CartDetails.Add(cartItems);
                }
                _context.SaveChanges();
                transaction.Commit();

                //var cartItemCount = await GetCartItemCount(userId);

                return true;
            }
            catch (Exception ex)
            {
                transaction.Rollback();
                return false;
                throw;
            }
            finally
            {
                transaction.Dispose();
            }
        }

        public async Task<Cart> GetCart(int userId)
        {
            return await _context.Carts.FirstOrDefaultAsync(x => x.UserId == userId);
        }

        public async Task<int> GetCartItemCount(int userId)
        {
            var data = await (from cart in _context.Carts
                              join cartDetail in _context.CartDetails
                              on cart.Id equals cartDetail.CartId
                              where cart.UserId == userId
                              select new { cartDetail.Id })
                              .ToListAsync();

            return data.Count;
        }

        public async Task<Cart> GetUserCart(int userId)
        {
            return await _context.Carts
                .Include(c => c.CartDetails)
                .Where(x => x.UserId == userId)
                .FirstOrDefaultAsync();
        }

        public async Task<bool> RemoveItem(int ChannelId, int userId)
        {
            var cart = await GetCart(userId);

            if (cart != null)
            {
                var cartItem = _context.CartDetails
                    .FirstOrDefault(x=>x.ChannelId == ChannelId && x.CartId == cart.Id);

                if (cartItem != null )
                    _context.CartDetails.Remove(cartItem);

                _context.SaveChanges();
            }

            //var cartItemCount = await GetCartItemCount(userId);
            return true;
        }

        public async Task<bool> ChannelInCart(int channelId, int cartId)
        {
            return _context.CartDetails.Any(x => x.ChannelId == channelId && x.CartId == cartId);
        }

        public async Task<bool> Checkout(int userId)
        {
            var transaction = _context.Database.BeginTransaction();
            try
            {
                var cart = await GetCart(userId);

                if (cart == null)
                    return false;

                var cartItem = _context.CartDetails.Where(x => x.CartId == cart.Id).ToList();

                if (cartItem.Count == 0)
                    return false;

                var plan = new Plan
                {
                    UserId = userId,
                    CreatedAt = DateTime.UtcNow,
                    Status = (int)PlanStatus.NotActive
                };
                _context.Plans.Add(plan);
                _context.SaveChanges();

                foreach (var item in cartItem)
                {
                    var planDetail = new PlanDetial
                    {
                        PlanId = plan.Id,
                        ChannelId = item.ChannelId,
                        Price = item.Price,
                        ChannelName = item.ChannelName,
                        Genre = item.Genre,
                        Language = item.Language,
                        PictureUrl = item.PictureUrl
                    };

                    _context.PlanDetials.Add(planDetail);
                    _context.CartDetails.Remove(item); // remove cartItems after adding them to plan details.
                }
                _context.Carts.Remove(cart); // delete cart after creating plan
                _context.SaveChanges();

                transaction.Commit();
            }
            catch (Exception ex)
            {
                transaction.Rollback();
                throw;
            }
            finally
            {
                transaction.Dispose();
            }

            return true;
        }
    }
}
