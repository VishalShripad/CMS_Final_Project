using CMS.API.Entities;

namespace CMS.API.Repositories
{
    public interface ICartRepository
    {
        Task<bool> AddItem(int ChannleId, int userId);
        Task<bool> RemoveItem(int ChannleId, int userId);
        Task<Cart> GetUserCart(int userId);
        Task<int> GetCartItemCount(int userId);
        Task<Cart> GetCart(int userId);
        Task<bool> ChannelInCart(int channelId, int cartId);
        Task<bool> Checkout(int userId);
    }
}
