namespace Parduotuves.Entities;

public class Bid
{
    public int Id { get; set; }
    public decimal Amount { get; set; }
    public Account Account { get; set; }
}