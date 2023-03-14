using CMS.API.Data;
using CMS.API.Entities;
using CMS.API.Helper;
using Microsoft.EntityFrameworkCore;

namespace CMS.API.Repositories
{
    public class UsersRepository : IUsersRepository
    {
        private readonly CMSAPIContext _context;

        public UsersRepository(CMSAPIContext context)
        {
            _context = context;
        }

        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<User> GetUser(int id, bool isCurrentUser)
        {
            var query = _context.Users.AsQueryable();

            if (isCurrentUser)
                query = query.IgnoreQueryFilters();

            var user = await query.FirstOrDefaultAsync(u => u.Id == id);

            return user;
        }

        public async Task<PagedList<User>> GetUsers(UserParams userParams)
        {
            var users = _context.Users.OrderByDescending(u => u.Created).Include(a=>a.Address).AsQueryable();

            users = users.Where(u => u.Id != userParams.UserId);

            return await PagedList<User>.CreteAsync(users, userParams.PageNumber, userParams.PageSize);
        }

        public async Task<User> GetUserWithAddress(int id)
        {
            var query = _context.Users.Include(u => u.Address).AsQueryable();

            var user = await query.SingleOrDefaultAsync(x => x.Id == id);

            return user;
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0; // return true if more than zero records saved
        }
    }
}
