using CMS.API.Dtos;

namespace CMS.API.Repositories
{
    public interface IEmailService
    {
        void SendEmail(Message message);
    }
}
