using CMS.API.Dtos;
using CMS.API.Entities;

namespace CMS.API.Repositories
{
    public interface IPaymentRepository
    {
        Task<Plan> Checkout(int userId);
        Task<bool> MakePayment(PaymentDto paymentDto, bool isSuccess, int userId);
        Task<bool> MakePlanActive(Plan plan);
        Task<bool> CheckForExistingActivePlan(int userId);
        Task<bool> CheckForExistingUnpaidPlan(int userId);
    }
}
