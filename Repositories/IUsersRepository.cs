using CMS.API.Entities;
using CMS.API.Helper;

namespace CMS.API.Repositories
{
    public interface IUsersRepository
    {
        void Add<T> (T entity) where T : class;
        void Delete<T> (T entity) where T : class;
        Task<bool> SaveAll();
        Task<PagedList<User>> GetUsers(UserParams userParams);
        Task<User> GetUser(int id, bool isCurrentUser);
        Task<User> GetUserWithAddress(int id);
    }
}
