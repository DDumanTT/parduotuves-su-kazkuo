namespace Parduotuves.Entities;

public class Item
{
    public int Id { get; set; }
    public decimal Price { get; set; }
    public string Name { get; set; }
    public string Code { get; set; }
    public string? Description { get; set; }

    public int ShopId { get; set; }
    public Shop Shop { get; set; }
}

