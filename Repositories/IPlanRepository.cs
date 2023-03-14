using CMS.API.Dtos;
using CMS.API.Entities;
using CMS.API.Helper;

namespace CMS.API.Repositories
{
    public interface IPlanRepository
    {
        Task<PagedList<Plan>> GetAllPlansForUserAsync(PlanParams planParams, int userId);
        Task<Plan> GetPlanByIdAsync(int planId);
    }
}