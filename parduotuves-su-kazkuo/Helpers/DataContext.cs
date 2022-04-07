using Microsoft.EntityFrameworkCore;
using Parduotuves.Entities;
namespace Parduotuves.Helpers;

using Microsoft.EntityFrameworkCore;
using Parduotuves.Entities;

public class DataContext : DbContext
{
    public DbSet<Account> Accounts { get; set; }

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

    public DbSet<Parduotuves.Entities.Shop> Shop { get; set; }
}