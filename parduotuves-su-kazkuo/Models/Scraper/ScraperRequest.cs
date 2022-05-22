using System.ComponentModel.DataAnnotations;

namespace ParduotuvesSuKazkuo.Models.Scraper
{
    public class ScraperRequest
    {
        [Required]
        public Parduotuves.Entities.Scraper Scraper { get; set; }

        [Required]
        public int ShopId { get; set; }
    }
}