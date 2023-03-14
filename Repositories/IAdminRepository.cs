using CMS.API.Dtos;
using CMS.API.Entities;
using CMS.API.Helper;

namespace CMS.API.Repositories
{
    public interface IAdminRepository
    {
        Task<List<VendorDto>> GetVendors();
        Task<VendorDto> GetVendorById(int vendorId);
        Task<string> DeactivateUserPlan(int userId, int planId);
        bool IsPlanForUser(int userId, int planId);
        string GetEmailOfUser(int userId);
        Task<Plan> GetLatestUserPlan(int userId);
        Task<UserWIthPlanDto> GetUserWithPlan(int userId);
    }
}
