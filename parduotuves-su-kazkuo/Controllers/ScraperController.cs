using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Parduotuves.Authorization;
using Parduotuves.Entities;
using Parduotuves.Helpers;
using ParduotuvesSuKazkuo.Models.Scraper;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ParduotuvesSuKazkuo.Controllers
{
    //TODO not tested controller
    //[Authorize(Role.Admin)]
    [Route("api/[controller]")]
    [ApiController]
    public class ScraperController : ControllerBase
    {
        private readonly DataContext _dataContext;

        public ScraperController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        // GET: api/<ScraperController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Scraper>>> GetScraper()
        {
            return await _dataContext.Scraper.ToListAsync();
        }

        // GET api/<ValuesController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Scraper>> GetScraper(int id)
        {
            //var scraper = await _dataContext.Scraper.FindAsync(id);
            Scraper scraper = new Scraper();
            scraper.Id = id;
            scraper.ShopId = 1;
            scraper.Created = new DateTime();
            scraper.Frequency = 100;
            scraper.Path = 5;
            scraper.Updated = new DateTime();

            if (scraper == null)
            {
                return NotFound();
            }

            return scraper;
        }

        // POST api/<ValuesController>
        [HttpPost]
        public Scraper PostScraper(Scraper scraper)
        {
            return scraper;
        }
//// POST api/<ValuesController>
//        [HttpPost]
//        public async Task<ActionResult<Scraper>> PostScraper(ScraperRequest scraper)
//        {
//            // TODO update shop
//            _dataContext.Scraper.Add(scraper.Scraper);
//            await _dataContext.SaveChangesAsync();

//            //TODO Add id for shop
//            return CreatedAtAction("GetScraper", new { id = scraper.Scraper.Id }, value: scraper);
//        }

        // PUT api/<ValuesController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutScraper(int id, Scraper scraper)
        {
            //TODO update shop by edited scraper
            if (id != scraper.Id)
            {
                return BadRequest();
            }

            _dataContext.Entry(scraper).State = EntityState.Modified;

            try
            {
                await _dataContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ScraperExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE api/<ValuesController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteScraper(int id)
        {
            var scraper = await _dataContext.Scraper.FindAsync(id);
            if (scraper == null)
            {
                return NotFound();
            }

            _dataContext.Scraper.Remove(scraper);
            //TODO remove scraper from its shop

            await _dataContext.SaveChangesAsync();

            return NoContent();
        }


        private bool ScraperExists(int id)
        {
            return _dataContext.Scraper.Any(e => e.Id == id);
        }
    }
}
