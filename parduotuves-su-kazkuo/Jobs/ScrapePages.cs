using Microsoft.EntityFrameworkCore;
using Parduotuves.Entities;
using Parduotuves.Helpers;
using Quartz;
using System.Linq;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Controller;
using MimeKit.Cryptography;

namespace ParduotuvesSuKazkuo.Jobs
{
    public class ScrapePages: IJob
    {
        private readonly DataContext _context;
        private  List<Item> _items; // key - url list - items
        private string LidlUrl = @"https://www.lidl.lt/pasiulymai";
        public ScrapePages(DataContext context)
        {
            _context = context;
            _items = _context.Item.ToList();
        }

        public Task Execute(IJobExecutionContext context)
        {
            var scheduler = context.Scheduler.Context;
            Console.WriteLine("Scraping pages " + DateTime.Now.ToString());

            var shops = _context.Shop.ToList();
            if (shops.Count == 0)
            {
                return Task.CompletedTask;
            }

            var scrapedItems = WebScraper.Scraper.Lidl(LidlUrl);
            var names = from item in _items select item.Name;
            for (var i = 0; i < scrapedItems.Count; i++)
            {
                var convertedItem = ItemConverter(scrapedItems[i]);
                if (!names.Contains(scrapedItems[i].Name))
                { // does not contains, add
                    _items.Add(convertedItem);
                    // todo check if database does not contains 
                    var item = _context.Item.FirstOrDefault(a => a.Name == scrapedItems[i].Name);
                    if (item == null)
                    {
                        _context.Item.AddAsync(convertedItem);
                        _context.SaveChanges();
                        Console.WriteLine("Inserting into db");
                    }
                }
                else
                {
                    var foundItemIndex = _items.Select((x, i) => new {x, i}).Where(pair => pair.x.Name.Equals(scrapedItems[i].Name)).Select(pair => pair.i).FirstOrDefault();
                    if (foundItemIndex != -1) // found
                    {
                        if (_items[foundItemIndex].Price != (decimal)scrapedItems[i].Price)
                        {
                            _items[foundItemIndex] = convertedItem;
                            var itemNewPrice = _context.Item.SingleOrDefault(b => b.Name.Equals(scrapedItems[i].Name));
                            if (itemNewPrice != null)
                            {
                                itemNewPrice.Price = (decimal)scrapedItems[i].Price;
                                _context.Entry(itemNewPrice).State = EntityState.Modified;
                                _context.Item.Update(itemNewPrice);
                                _context.SaveChanges();
                            }
                            //Console.WriteLine("Overriding old item");
                        }
                        else
                        {
                            //Console.WriteLine("prices same, skip");
                        }
                    }
                }
            }
            return Task.CompletedTask;
        }

        public Item ItemConverter(WebScraper.Item WebItem)
        {
            Item item = new Item();
            item.Name = WebItem.Name;
            item.Description = WebItem.Description;
            item.Code = WebItem.ItemCode;
            item.Price = (decimal)WebItem.Price;
            var shops = _context.Shop.ToList();
            if (shops.Count > 0)
            {
                item.Shop = shops[0];
            }
            return item;
        }

        public void UpdateItems(List<WebScraper.Item> WebItems)
        {

        }
    }
}
