using System.ComponentModel.DataAnnotations;

namespace Parduotuves.Entities;

public class Shop
{
    public int Id { get; set; }
    [Required]
    public string Name { get; set; }
    public string Longitude { get; set; }
    public string Latitude { get; set; }
    public string Address { get; set; }
    public string PlaceId { get; set; }

    public int? WebsiteId { get; set; }
    public Website? Website { get; set; }

    public List<Item>? Items { get; set; }

    //public List<Scraper> Scrapers { get; set; }

}