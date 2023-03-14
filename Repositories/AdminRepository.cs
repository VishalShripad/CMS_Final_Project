using CMS.API.Data;
using CMS.API.Dtos;
using CMS.API.Entities;
using CMS.API.Helper;
using Microsoft.EntityFrameworkCore;
using System.Threading.Channels;

namespace CMS.API.Repositories
{
    public class AdminRepository : IAdminRepository
    {
        private readonly CMSAPIContext _context;

        public AdminRepository(CMSAPIContext context)
        {
            _context = context;
        }

        public async Task<List<VendorDto>> GetVendors()
        {
            var vendors = await _context.Vendors
                .Include(x => x.Channels)
                .ToListAsync();

            var channels = _context.Channels
                .Include(x => x.ChannelGenre)
                .Include(x => x.ChannelLanguage)
                .ToList();

            var plans = _context.Plans.Where(x => x.Status == (int)PlanStatus.Active).ToList();

            var planDetails = _context.PlanDetials.GroupBy(x=>x.ChannelId).ToList();

            ChannelDto channelDto = null;

            List<ChannelDto> channelsDto = new List<ChannelDto>();

            foreach (var ch in channels)
            {
                channelDto = new ChannelDto();

                channelDto.Id = ch.Id;
                channelDto.Name = ch.Name;
                channelDto.Description = ch.Description;
                channelDto.Price = ch.Price;
                channelDto.ChannelLanguage = ch.ChannelLanguage.Name;
                channelDto.ChannelGenre = ch.ChannelGenre.Name;
                channelDto.PictureUrl = ch.PictureUrl;
                channelDto.VendorId = ch.VendorsId;
                channelDto.NumberOfUsers = 0;

                channelsDto.Add(channelDto);
            }

            foreach (var item in planDetails)
            {
                var planId = item.Select(x => x.PlanId).ToList();
                var userIdCount = plans.Where(x => planId.Contains(x.Id)).Select(x => x.UserId).Count();

                var chFromDto = channelsDto.Where(x => x.Id == item.Key).FirstOrDefault();

                chFromDto.NumberOfUsers = userIdCount;

                //var channel = channels.Where(x => x.Id == item.Key).FirstOrDefault();

                //channelDto.Id = item.Key;
                //channelDto.Name = channel.Name;
                //channelDto.Description = channel.Description;
                //channelDto.Price = channel.Price;
                //channelDto.ChannelGenre = channel.ChannelGenre.Name;
                //channelDto.ChannelLanguage = channel.ChannelLanguage.Name;
                //channelDto.NumberOfUsers = userIdCount;
                //channelDto.VendorId = channels.FirstOrDefault(x => x.Id == item.Key).VendorsId;

            }

            List<VendorDto> vendorDtos = new List<VendorDto>();
            VendorDto vendorDto = null;

            foreach (var item in vendors)
            {
                vendorDto = new VendorDto();
                vendorDto.Id = item.Id;
                vendorDto.Name = item.Name;
                vendorDto.Description = item.Description;
                vendorDto.IsActive = item.IsActive;
                vendorDto.TotalPrice = item.Channels.Sum(x => x.Price);
                vendorDto.TotalUserCount = channelsDto.Where(x=>x.VendorId == item.Id).Sum(x => x.NumberOfUsers);
                vendorDto.Channels = channelsDto.Where(x=>x.VendorId == item.Id).ToList();

                vendorDtos.Add(vendorDto);
            }

            return vendorDtos;
        }

        public async Task<VendorDto> GetVendorById(int vendorId)
        {
            var channels = _context.Channels
                .Include(x => x.ChannelGenre)
                .Include(x => x.ChannelLanguage)
                .Where(x => x.VendorsId == vendorId)
                .ToList();

            var channelDtoLst = new List<ChannelDto>();

            foreach (var item in channels)
            {
                var channelDto = new ChannelDto
                {
                    Name = item.Name,
                    Description = item.Description,
                    Price = item.Price,
                    ChannelGenre = item.ChannelGenre.Name,
                    ChannelLanguage = item.ChannelLanguage.Name,
                    PictureUrl = item.PictureUrl
                };
                channelDtoLst.Add(channelDto);
            }

            var vendor = _context.Vendors.FirstOrDefault(x=>x.Id == vendorId);

            var vendorToReturn = new VendorDto
            {
                Id = vendorId,
                Name = vendor.Name,
                Description = vendor.Description,
                Channels = channelDtoLst,
                TotalPrice = channelDtoLst.Sum(x => x.Price)
            };

            return vendorToReturn;
        }

        public async Task<string> DeactivateUserPlan(int userId, int planId)
        {
            var plan = await _context.Plans
                .Where(x=> x.Id == planId && x.UserId == userId && x.Status == (int)PlanStatus.Active)
                .OrderByDescending(x=>x.EndDate)
                .FirstOrDefaultAsync();

            if (plan == null)
                return "Active";

            plan.Status = (int)PlanStatus.Expired;
            _context.Plans.Update(plan);
            

            var activatePlan = await _context.Plans
                .Where(x => x.UserId == userId && x.Status == (int)PlanStatus.NotActive && x.IsPaymentSuccess == true)
                .FirstOrDefaultAsync();

            if (activatePlan == null)
            {
                return "NotToActive";
            }

            activatePlan.Status = (int)PlanStatus.Active;
            _context.Plans.Update(activatePlan);

            if (_context.SaveChanges() > 0)
                return "success";
            else
                return "error";
        }

        public bool IsPlanForUser(int userId, int planId)
        {
            return _context.Plans.Any(x => x.UserId == userId && x.Id == planId);
        }

        public string GetEmailOfUser(int userId)
        {
            return _context.Users.FirstOrDefault(x => x.Id == userId).Email;
        }

        public async Task<Plan> GetLatestUserPlan(int userId)
        {
            var plan = _context.Plans
                .Where(x=>x.UserId == userId && x.Status == (int)PlanStatus.Active)
                .OrderByDescending(x=>x.EndDate)
                .FirstOrDefault();

            return plan;
        } 

        public async Task<UserWIthPlanDto> GetUserWithPlan(int userId)
        {
            var user = _context.Users.Where(x=>x.Id == userId).FirstOrDefault();
            var plan = _context.Plans.Where(x => x.UserId == userId).ToList();

            PlanDto planDto = null;
            List<PlanDto> plans = new List<PlanDto>();
            UserWIthPlanDto userWIthPlan = new UserWIthPlanDto();

            foreach (var item in plan)
            {
                planDto = new PlanDto();
                planDto.Id = item.Id;
                planDto.CreatedAt = item.CreatedAt;
                planDto.IsPaymentSuccess = item.IsPaymentSuccess;
                planDto.Status = item.Status;
                planDto.SubTotal = item.SubTotal;

                plans.Add(planDto);
            }

            userWIthPlan.Id = user.Id;
            userWIthPlan.DisplayName = user.DisplayName;
            userWIthPlan.Email = user.Email;
            userWIthPlan.Created = user.Created;
            userWIthPlan.Plans = plans;

            return userWIthPlan;
        } 
    }
}
