using CMS.API.Data;
using CMS.API.Dtos;
using CMS.API.Entities;
using CMS.API.Helper;
using Microsoft.EntityFrameworkCore;

namespace CMS.API.Repositories
{
    public class PlanRepository : IPlanRepository
    {
        private readonly CMSAPIContext _context;

        public PlanRepository(CMSAPIContext context)
        {
            _context = context;
        }

        public async Task<PagedList<Plan>> GetAllPlansForUserAsync(PlanParams planParams, int userId)
        {
            var plans = _context.Plans.Include(p => p.PlanDetail)
                .Where(x=>x.UserId == userId).AsQueryable();

            if (!string.IsNullOrWhiteSpace(planParams.Sort))
            {
                switch(planParams.Sort)
                {
                    case "ascending":
                        plans = plans.OrderBy(x => x.CreatedAt);
                        break;
                    default:
                        plans = plans.OrderByDescending(x => x.CreatedAt);
                        break;
                }
            }

            return await PagedList<Plan>.CreteAsync(plans, planParams.PageNumber, planParams.PageSize);
        }

        public async Task<Plan> GetPlanByIdAsync(int planId)
        {
            return _context.Plans.Include(p=>p.PlanDetail).SingleOrDefault(p => p.Id == planId);
        }
    }
}
