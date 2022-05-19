using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace WebScraper
{
    class ScraperUtils
    {
        private static readonly Regex reg = new Regex("[*'\"_&#^@(\n)]");

        public static string RemoveSpecialCharacters(string text)
        {
            return reg.Replace(text, string.Empty);
        }

        public static string RemoveMultipleWhiteSpaces(string text)
        {
            return Regex.Replace(text, @"\s+", " ");
        }
    }
}
