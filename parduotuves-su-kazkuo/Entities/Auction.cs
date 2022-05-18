using System.ComponentModel.DataAnnotations;

namespace Parduotuves.Entities;

public class Auction
{
    public int Id { get; set; }
    public DateTime ExpirationDate { get; set; }
    public string Name { get; set; }
    public List<Bid> Bid { get; set; }
    public Prize Prize { get; set; }
}