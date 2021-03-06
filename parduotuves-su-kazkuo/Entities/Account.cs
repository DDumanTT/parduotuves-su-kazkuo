using System.Text.Json.Serialization;

namespace Parduotuves.Entities;

public class Account
{
    public int Id { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string Email { get; set; }
    [JsonIgnore]
    public string? PasswordHash { get; set; }
    public Role Role { get; set; }
    public string? VerificationToken { get; set; }
    public DateTime? Verified { get; set; }
    public bool IsVerified => Verified.HasValue || PasswordReset.HasValue;
    public string? ResetToken { get; set; }
    public DateTime? ResetTokenExpires { get; set; }
    public DateTime? PasswordReset { get; set; }
    public DateTime Created { get; set; }
    public DateTime? Updated { get; set; }
    [JsonIgnore]
    public List<RefreshToken> RefreshTokens { get; set; }
    public List<Ticket>? Tickets { get; set; } = new();
    public List<Bid>? Bids { get; set; }
    public decimal Money { get; set; } = 0m;
    public List<Prize>? Prize { get; set; } = new();

    public bool OwnsToken(string token)
    {
        return RefreshTokens?.Find(x => x.Token == token) != null;
    }
}