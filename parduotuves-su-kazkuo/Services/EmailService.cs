namespace Parduotuves.Services;

using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;
using MimeKit.Text;
using Parduotuves.Helpers;

public interface IEmailService
{
    void Send(string to, string subject, string html, string from = null);
}

public class EmailService : IEmailService
{
    private readonly SMTPSettings _smtpSettings;

    public EmailService(IOptions<SMTPSettings> smtpSettings)
    {
        _smtpSettings = smtpSettings.Value;
    }

    public void Send(string to, string subject, string html, string from = null)
    {
        // create message
        var email = new MimeMessage();
        email.From.Add(MailboxAddress.Parse(from ?? _smtpSettings.EmailFrom));
        email.To.Add(MailboxAddress.Parse(to));
        email.Subject = subject;
        email.Body = new TextPart(TextFormat.Html) { Text = html };

        // send email
        using var smtp = new SmtpClient();
        smtp.Connect(_smtpSettings.SmtpHost, _smtpSettings.SmtpPort, SecureSocketOptions.StartTls);
        smtp.Authenticate(_smtpSettings.SmtpUser, _smtpSettings.SmtpPass);
        smtp.Send(email);
        smtp.Disconnect(true);
    }
}