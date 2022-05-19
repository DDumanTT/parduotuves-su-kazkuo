using HtmlAgilityPack;
using HtmlAgilityPack.CssSelectors.NetCore;
using WebScraper;

string urlLidl = @"https://www.lidl.lt/pasiulymai"; 
string urlMaxima = @"https://www.maxima.lt/akcijos"; 
string urlBarbora = @"https://barbora.lt/?redirectafterlogin=https%3A%2F%2Fbarbora.lt%2Fmano-prekes"; 

// TODO implement barbora

//Scraper.Lidl(urlLidl);
Scraper.Maxima(urlMaxima);

namespace WebScraper
{
    class Scraper
    {
        public static List<Item> Lidl(string url)
        {
            //string url = @"https://www.lidl.lt/pasiulymai"; // tested case
            HtmlWeb web = new HtmlWeb();
            var htmlDoc = web.Load(url);

            IList<HtmlNode> nodes = htmlDoc.QuerySelectorAll("div .nuc-a-flex-item .nuc-a-flex-item--width-6"); // nuc-a-flex-item nuc-a-flex-item--width-6 nuc-a-flex-item--width-4@sm
            List<Item> items = new List<Item>();
            foreach (HtmlNode node in nodes)
            {
                try
                {
                    HtmlNode nameNode = node.QuerySelector("h3 .ret-o-card__headline");
                    string nameWithWhiteSpaces = ScraperUtils.RemoveSpecialCharacters(nameNode != null ? nameNode.InnerText : "");
                    string name = ScraperUtils.RemoveMultipleWhiteSpaces(nameWithWhiteSpaces);
                    HtmlNode priceNode = node.QuerySelector("span .lidl-m-pricebox__price");
                    string priceText = priceNode != null ? priceNode.InnerText.Replace('.', ',') : "";
                    string priceTextRemovedSpecialChars = ScraperUtils.RemoveSpecialCharacters(priceText);
                    double price = Double.Parse(priceTextRemovedSpecialChars); // TODO input is empty string, crashes
                    //double price = Double.Parse(priceTextRemovedSpecialChars == "" ? "-1" : priceTextRemovedSpecialChars);
                    items.Add(new Item(name, price, "", ""));
                }
                catch { }
            }

            return items;
        }

        public static List<Item> Maxima(string url)
        {
            HtmlWeb web = new HtmlWeb();
            var htmlDoc = web.Load(url);

            //IList<HtmlNode> nodes = htmlDoc.QuerySelectorAll("div .nuc-a-flex-item .nuc-a-flex-item--width-6"); // nuc-a-flex-item nuc-a-flex-item--width-6 nuc-a-flex-item--width-4@sm

            List<Item> items = new List<Item>();
            //foreach (HtmlNode node in nodes)
            //{
            //    try
            //    {
            //        HtmlNode nameNode = node.QuerySelector("h3 .ret-o-card__headline");
            //        string nameWithWhiteSpaces = ScraperUtils.RemoveSpecialCharacters(nameNode != null ? nameNode.InnerText : "");
            //        string name = ScraperUtils.RemoveMultipleWhiteSpaces(nameWithWhiteSpaces);
            //        HtmlNode priceNode = node.QuerySelector("span .lidl-m-pricebox__price");
            //        string priceText = priceNode != null ? priceNode.InnerText.Replace('.', ',') : "";
            //        string priceTextRemovedSpecialChars = ScraperUtils.RemoveSpecialCharacters(priceText);
            //        double price = Double.Parse(priceTextRemovedSpecialChars); // TODO input is empty string, crashes
            //        //double price = Double.Parse(priceTextRemovedSpecialChars == "" ? "-1" : priceTextRemovedSpecialChars);
            //        items.Add(new Item(name, price, "", ""));
            //    }
            //    catch { }
            //}
            throw new NotImplementedException("Maxima scraper is not implemented");
            return items;
        }
    }


}
