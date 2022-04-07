namespace Parduotuves.Entities;
public class Website
{
    public int Id { get; set; }
    public string Url { get; set; }
    public string Name { get; set; }

    public List<Shop> Shops { get; set; }
    public List<Item>? Items { get; set; }
}
