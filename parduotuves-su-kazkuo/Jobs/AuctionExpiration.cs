using Microsoft.EntityFrameworkCore;
using Parduotuves.Entities;
using Parduotuves.Helpers;
using Quartz;

namespace ParduotuvesSuKazkuo.Jobs
{
    public class AuctionExpiration : IJob
    {
        private readonly DataContext _context;

        public AuctionExpiration(DataContext context)
        {
            _context = context;
        }

        public Task Execute(IJobExecutionContext context)
        {
            var scheduler = context.Scheduler.Context;

            var id = (int)scheduler.Get("id");

            var auction = _context.Auction
                .Include(x => x.Bid)
                .ThenInclude(x => x.Account)
                .Include(x => x.Prize)
                .FirstOrDefault(x => x.Id == id);

            if (auction == null)
            {
                return Task.CompletedTask;
            }
            auction.Active = false;

            var maxBidder = auction.Bid.OrderByDescending(x => x.Amount).FirstOrDefault();
            if (maxBidder != null)
            {
                var user = _context.Accounts.Find(maxBidder.Account.Id)!;
                user.Prize ??= new List<Prize>();
                auction.Prize.WinDate = DateTime.Now;
                user.Prize.Add(auction.Prize);
            }

            _context.SaveChanges();
            return Task.CompletedTask;
        }
    }
}
