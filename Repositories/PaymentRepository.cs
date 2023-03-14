using CMS.API.Data;
using CMS.API.Dtos;
using CMS.API.Entities;
using CMS.API.Helper;

namespace CMS.API.Repositories
{
    public class PaymentRepository : IPaymentRepository
    {
        private readonly CMSAPIContext _context;
        private readonly ICartRepository _cartRepository;
        private readonly IPlanRepository _planRepository;
        private readonly IConfiguration _config;

        public PaymentRepository(CMSAPIContext context, ICartRepository cartRepository,
            IPlanRepository planRepository, IConfiguration config)
        {
            _context = context;
            _cartRepository = cartRepository;
            _planRepository = planRepository;
            _config = config;
        }

        public async Task<Plan> Checkout(int userId)
        {
            var transaction = _context.Database.BeginTransaction();
            try
            {
                var cart = await _cartRepository.GetCart(userId);

                if (cart == null)
                    return null;

                var cartItem = _context.CartDetails.Where(x => x.CartId == cart.Id).ToList();

                if (cartItem.Count == 0)
                    return null;

                var plan = new Plan
                {
                    UserId = userId,
                    CreatedAt = DateTime.UtcNow,
                    SubTotal = cartItem.Sum(c => c.Price),
                    IsPaymentSuccess = false,
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

                return plan;
            }
            catch (Exception ex)
            {
                transaction.Rollback();
                return null;
                throw;
            }
            finally
            {
                transaction.Dispose();
            }

            
        }

        public async Task<bool> MakePayment(PaymentDto paymentDto, bool isSuccess, int userId)
        {
            var transaction = _context.Database.BeginTransaction();
            try
            {
                var plan = await _planRepository.GetPlanByIdAsync(paymentDto.PlanId);

                var payment = new PaymentStatus
                {
                    ModeOfPayment = paymentDto.ModeOfPayment,
                    PlanId = plan.Id,
                    UserId = userId,
                    CreatedAt = paymentDto.CreatedAt,
                    IsSuccess = isSuccess,
                };

                _context.PaymentStatus.Add(payment);
                
                plan.IsPaymentSuccess = isSuccess;

                _context.Plans.Update(plan);

                _context.SaveChanges();

                transaction.Commit();
                
                // for demo isSuccess is pass as no paymentGateway is added.
                // isSuccess is coming from appsettings.json to test success and fail senario
                return isSuccess;
            }
            catch(Exception ex)
            {
                transaction.Rollback();
                return false;
            }
            finally
            {
                transaction.Dispose();
            }
        }

        public async Task<bool> MakePlanActive(Plan plan)
        {
            if (_context.Plans.Any(x=>x.Id == plan.Id && x.Status == (int)PlanStatus.NotActive && x.IsPaymentSuccess == true))
            {
                plan.StartDate = DateTime.UtcNow;
                plan.EndDate = DateTime.UtcNow.AddDays(28);
                plan.Status = (int)PlanStatus.Active;
                _context.Plans.Update(plan);
                _context.SaveChanges();

                return true;
            }
            else
            { return false; }
        }

        public async Task<bool> CheckForExistingActivePlan(int userId)
        {
            var plan = _context.Plans.Where(x=>x.UserId == userId && x.Status == (int)PlanStatus.Active)
                .OrderByDescending(x=>x.EndDate).FirstOrDefault();

            if(plan != null)
            {
                System.TimeSpan remainingDays = (TimeSpan)(plan.EndDate - DateTime.UtcNow);
                
                if(remainingDays.Days > Convert.ToInt32(_config.GetSection("AppSettings:MinimumTimeToRechargePlanInDays").Value))
                {
                    return true;
                }
            }

            return false;
        }

        public async Task<bool> CheckForExistingUnpaidPlan(int userId)
        {
            var plan = _context.Plans
                .Where(x => x.UserId == userId && x.Status == (int)PlanStatus.NotActive && x.IsPaymentSuccess == false)
                .FirstOrDefault();

            if(plan != null)
            {
                return true;
            }

            return false;
        }
    }
}
