namespace Parduotuves.Helpers;

using Microsoft.EntityFrameworkCore;
using Entities;
using BCrypt.Net;

public class DataContext : DbContext
{
    public DbSet<Account> Accounts { get; set; }
    public DbSet<Shop> Shop { get; set; }
    public DbSet<Auction> Auction { get; set; }
    public DbSet<Bid> Bid { get; set; }
    public DbSet<Prize> Prize { get; set; }

    private readonly IConfiguration Configuration;

    public DataContext(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        // connect to sql database
        options.UseSqlServer(Configuration.GetConnectionString("DevConnection"));
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Account>().HasData(new Account
        {
            Id = -1,
            Email = "admin@parduotuves.com",
            PasswordHash = BCrypt.HashPassword("password"),
            Role = Role.Admin,
            Created = DateTime.UtcNow,
            Verified = DateTime.UtcNow,
            Money = 9999999m
        });

        //int id = 1;
        //foreach (int page in Enum.GetValues(typeof(Page)))
        //{
        //    modelBuilder.Entity<PageContent>().HasData(new PageContent
        //    {
        //        Id = id++,
        //        PageName = (Page)page,
        //        Content = "",
        //    });

        //}

    }

}