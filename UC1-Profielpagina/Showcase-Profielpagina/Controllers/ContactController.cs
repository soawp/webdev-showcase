using Microsoft.AspNetCore.Mvc;
using System;
using System.Net;
using System.Net.Mail;

namespace Showcase_Profielpagina.Controllers
{
    public class ContactController : Controller
    {
        public ActionResult Me()
        {
            return View();
        }

        [HttpPost]
        public IActionResult SendTestEmail(string name, string email, string phone, string subject, string message)
        {
            try
            {
                using (var client = new SmtpClient("sandbox.smtp.mailtrap.io", 2525))
                {
                    client.Credentials = new NetworkCredential("b21638ea3c2603", "a9803fb7276c4e");
                    client.EnableSsl = true;
                    client.UseDefaultCredentials = false;
                    client.DeliveryMethod = SmtpDeliveryMethod.Network;

                    using (var mailMessage = new MailMessage())
                    {
                        mailMessage.From = new MailAddress(email);
                        mailMessage.To.Add("daandejager2002@gmail.com");
                        mailMessage.Subject = subject;
                        mailMessage.Body = message + $"\n\n Gestuurd door: {name}, {email}, {phone}";
                        mailMessage.IsBodyHtml = false;

                        client.Send(mailMessage);
                    }
                }

                TempData["SuccessMessage"] = "E-mail is succesvol verzonden!";
            }
            catch (Exception ex)
            {
                TempData["ErrorMessage"] = $"Fout bij verzenden: {ex.Message}";
            }

            return RedirectToAction("Me");
        }
    }
}
