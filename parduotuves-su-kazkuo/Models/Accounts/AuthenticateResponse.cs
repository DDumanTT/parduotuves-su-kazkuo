namespace Parduotuves.Models.Accounts;

using System.Text.Json.Serialization;
using Parduotuves.Entities;

public class AuthenticateResponse
{
    public int Id { get; set; }
    //public string Title { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string Role { get; set; }
    public DateTime Created { get; set; }
    public DateTime? Updated { get; set; }
    public bool? LoggedInToday { get; set; }
    public Ticket Ticket { get; set; }


    [JsonIgnore]
    public string JwtToken { get; set; }
    [JsonIgnore] // refresh token is returned in http only cookie
    public string RefreshToken { get; set; }
}