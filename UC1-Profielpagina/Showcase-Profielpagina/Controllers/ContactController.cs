using Microsoft.AspNetCore.Mvc;
using Showcase_Profielpagina.Models;
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
        public IActionResult SendTestEmail(Contactform model)
        {
            if (!ModelState.IsValid)
            {
                TempData["ErrorMessage"] = "Er zijn validatiefouten. Controleer het formulier en probeer het opnieuw.";
                return View("Me");
            }

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
                        mailMessage.From = new MailAddress(model.Email);
                        mailMessage.To.Add("daandejager2002@gmail.com");
                        mailMessage.Subject = model.Subject;
                        mailMessage.Body = $"{model.Message}\n\nGestuurd door: {model.FirstName} {model.LastName}, {model.Email}, {model.Phone}";
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
