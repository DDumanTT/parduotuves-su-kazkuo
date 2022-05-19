namespace  WebScraper
{
    class Item
    {
        public string Name { get; set; }
        public double Price { get; set; }
        //private double Price { get; set; }
        public string Description { get; set; }

        public string ItemCode { get; set; }

        public Item(string name, double price, string description, string itemCode)
        {
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
