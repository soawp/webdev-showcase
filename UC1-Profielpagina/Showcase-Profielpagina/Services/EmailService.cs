using System.Net.Mail;
using System.Net;

namespace Showcase_Profielpagina.Services
{
    public class EmailService
    {
        public void SendEmail()
        {
            try
            {
                using (var client = new SmtpClient("sandbox.smtp.mailtrap.io", 2525))
                {
                    client.Credentials = new NetworkCredential("b21638ea3c2603", "a9803fb7276c4e");
                    client.EnableSsl = true;

                    var mailMessage = new MailMessage
                    {
                        From = new MailAddress("from@example.com"),
                        Subject = "Hello world",
                        Body = "testbody",
                        IsBodyHtml = false,
                    };
                    mailMessage.To.Add("to@example.com");

                    client.Send(mailMessage);
                    Console.WriteLine("Email sent successfully.");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error sending email: {ex.Message}");
            }
        }
    }
}
