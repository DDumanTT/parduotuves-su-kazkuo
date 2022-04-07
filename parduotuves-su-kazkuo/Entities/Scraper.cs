namespace Parduotuves.Entities;

public class Scraper
{
    public int Id { get; set; }
    public DateTime Created { get; set; }
    public DateTime Updated { get; set; }
    public int? Path { get; set; }
    public int Frequency { get; set; }

    public int? ShopId { get; set; }
    public Shop? Shop { get; set; }
}
