#nullable disable
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Parduotuves.Authorization;
using Parduotuves.Controllers;
using Parduotuves.Entities;
using Parduotuves.Helpers;
using ParduotuvesSuKazkuo.Jobs;
using Quartz;

namespace ParduotuvesSuKazkuo.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AuctionsController : BaseController
    {
        private readonly DataContext _context;
        private readonly ISchedulerFactory _factory;

        public AuctionsController(DataContext context, ISchedulerFactory factory)
        {
            _context = context;
            _factory = factory;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Auction>>> GetAuctions()
        {
            return await _context.Auction
                .Include(x => x.Bid)
                .ThenInclude(x => x.Account)
                .Include(x => x.Prize)
                .ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<Shop>> CreateAuction(Auction auction)
        {
            _context.Auction.Add(auction);
            await _context.SaveChangesAsync();
            var scheduler = await _factory.GetScheduler();

            var job = JobBuilder.Create<AuctionExpiration>()
                .WithIdentity(Guid.NewGuid().ToString(), "auction_expiration").Build();

            var trigger = TriggerBuilder.Create().WithIdentity(Guid.NewGuid().ToString(), "auction_expiration")
                .StartAt(auction.ExpirationDate).Build();

            scheduler.Context.Put("id", auction.Id);
            await scheduler.ScheduleJob(job, trigger);
            return Ok(new { message = "Auction was added" });
        }

        [HttpDelete]
        public async Task<ActionResult> DeleteAll()
        {
            var auctions = await _context.Auction.ToListAsync();
            var bids = await _context.Bid.ToListAsync();
            var prizes = await _context.Prize.ToListAsync();

            foreach (var auction in auctions)
            {
                _context.Auction.Remove(auction);
            }

            foreach (var bid in bids)
            {
                _context.Bid.Remove(bid);
            }

            foreach (var prize in prizes)
            {
                _context.Prize.Remove(prize);
            }

            await _context.SaveChangesAsync();

            return Ok("xd");
        }

        public record BidData(decimal amount);

        [HttpPost("{id}")]
        public async Task<ActionResult<Shop>> Bid(int id, BidData bidData)
        {
            var auction = await _context.Auction.Include(x => x.Bid).ThenInclude(x => x.Account).FirstOrDefaultAsync(x => x.Id == id);
            if (auction == null) return NotFound();

            // Checks if enough cash
            if (bidData.amount <= 0m || auction.Bid.Any() && bidData.amount <= auction.Bid.Max(x => x.Amount))
            {
                return BadRequest(new { message = "Bid should be higher" });
            }

            // Checks if new bid is higher then prev bid
            if (Account.Money < bidData.amount)
            {
                return BadRequest(new { message = "Not enough money" });
            }

            // Returns money to prev bidder
            var prevBid = auction.Bid.OrderByDescending(x => x.Amount).FirstOrDefault();
            if (prevBid != null)
            {
                prevBid.Account.Money += prevBid.Amount;
            }

            // Subtracts money from current user
            var account = await _context.Accounts.FindAsync(Account.Id);
            account.Money -= bidData.amount;

            // Create bid
            var bid = new Bid
            {
                Account = account,
                Amount = bidData.amount
            };
            auction.Bid.Add(bid);

            await _context.SaveChangesAsync();
            return Ok(new { message = "Bid was successful", money = account.Money });
        }
    }
}
