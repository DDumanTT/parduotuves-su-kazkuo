namespace  WebScraper
{
    public class Item
    {
        public string UniqueId { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        //private double Price { get; set; }
        public string Description { get; set; }

        public string ItemCode { get; set; }

        public Item(string name, double price, string description, string itemCode)
        {
            UniqueId = Guid.NewGuid().ToString();
            Name = name;
            Price = price;
            Description = description;
            ItemCode = itemCode;
        }

        public override string ToString()
        {
            return this.Name + " " + this.Price + " " + this.Description + " " + this.ItemCode;
        }
    }
}
