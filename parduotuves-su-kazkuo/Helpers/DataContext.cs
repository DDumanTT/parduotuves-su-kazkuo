namespace Parduotuves.Helpers;

using Microsoft.EntityFrameworkCore;
using Parduotuves.Entities;
using BCrypt.Net;
using Microsoft.EntityFrameworkCore;
using Parduotuves.Entities;

public class DataContext : DbContext
{
    public DbSet<Account> Accounts { get; set; }
    public DbSet<Shop> Shop { get; set; }

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
            Verified = DateTime.UtcNow
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