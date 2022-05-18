namespace Parduotuves.Entities;

using System.Text.Json.Serialization;

public class Ticket
{
    public int Id { get; set; }
    public string Title { get; set; }

    [JsonIgnore]
    public Account Account { get; set; }
}
