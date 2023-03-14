using MimeKit;

namespace CMS.API.Dtos
{
    public class Message
    {
        public List<MailboxAddress> To { get; set; }
        public string Subject { get; set; } = "CMS Notification";
        public string Content { get; set; }

        public Message(IEnumerable<string> to, string content)
        {
            To = new List<MailboxAddress>();
            To.AddRange(to.Select(x => new MailboxAddress("email", x)));
            Content = content;
        }
    }
}
