using ParduotuvesSuKazkuo.Jobs;
using Quartz;
using Quartz.Impl;

namespace ParduotuvesSuKazkuo.Services
{
    public class ScraperService : IHostedService
    {
        private readonly IServiceProvider _serviceProvider;
        public ScraperService(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            Console.WriteLine("StartAsync");
            using (var scope = _serviceProvider.CreateScope())
            {
                // Example
                // Get the DbContext instance
                //var myDbContext = scope.ServiceProvider.GetRequiredService<MyDbContext>();

                //Do the migration asynchronously
                //await myDbContext.Database.MigrateAsync();

                string WebscraperGroup = "page_scraper";

                StdSchedulerFactory factory = new StdSchedulerFactory();
                var scheduler = await factory.GetScheduler();
                await scheduler.Start();

                var job = JobBuilder.Create<ScrapePages>()
                    .WithIdentity(Guid.NewGuid().ToString(), WebscraperGroup).Build();

                var trigger = TriggerBuilder.Create()
                    .WithIdentity(Guid.NewGuid().ToString(), WebscraperGroup)
                    .StartNow()
                    .WithSimpleSchedule(x => x
                        .WithIntervalInSeconds(5)
                        //.WithIntervalInHours(24)
                        .RepeatForever())
                    .Build();

                scheduler.Context.Put("scraper_id", 10);
                //scheduler.Context.Put("id", auction.Id);
                await scheduler.ScheduleJob(job, trigger);
            }
            Console.WriteLine("StartAsync exited");
        }

        public Task StopAsync(CancellationToken cancellationToken) => Task.CompletedTask;
    }
}
