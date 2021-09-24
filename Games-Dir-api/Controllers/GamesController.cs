using Games_Dir_api.Data;
using Games_Dir_api.Data.Paging;
using Games_Dir_api.Data.Services;
using Games_Dir_api.Data.ViewModels;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Games_Dir_api.Controllers
{
    [Route("api/games")]
    [ApiController]
    public class GamesController : ControllerBase
    {
        public GamesService _gamesService;
        private AppDbContext _context;
        public GamesController(GamesService gamesService, AppDbContext context)
        {
            _gamesService = gamesService;
            _context = context;
        }

        //GET ALL GAMES + SEARCH

        [HttpGet]
        public async Task<IActionResult> GetAllGames([FromQuery]string keyword)
        {
            var allGames = await _gamesService.GetAllGames(keyword);
            return Ok(allGames);
        }

        //GET LIMITED NUMBER OF GAMES FOR HOMEPAGE
        
        [HttpGet("homepage")]
        public async Task<IActionResult> GetHomepage()
        {
            var homepage = await _gamesService.GetHomepage();
            return Ok(homepage);
        }

        //GET GAMES FOR ADMIN GAME LIST, PAGINATION
        [Authorize(Roles ="Admin", AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet("paginate")]
        public async Task<IActionResult> GetAllGames([FromQuery]int? pageNumber )
        {
            int pageSize = 10;
            int page = pageNumber ?? 1;
            int count = await _context.Games.CountAsync();
            List<FullGameVM> games = await _context.Games.Select(game => new FullGameVM()
            {
                Id = game.Id,
                Title = game.Title,
                Publisher = game.Publisher,
                Price = game.Price,
                GenreName = game.Genre.Name,
                Image = game.Image,
                Description = game.Description,
                NumberInStock = game.NumberInStock,
                MinRequirements = game.MinRequirements,
                RecRequirements = game.RecRequirements,
                Rating = game.Rating,
                NumReviews = game.NumReviews,
            }).Skip(pageSize * (page - 1)).Take(pageSize).ToListAsync();

            return Ok(new PaginationGames()
            {
                Games = games,
                Page = page,
                Pages = Math.Ceiling(count / (double)pageSize)
            });
        }

        //GET GAME BY ID

        [HttpGet("{id}")]
        public async Task<IActionResult> GetGame(int id)
        {
            var game = await _gamesService.GetGameById(id);
            if (game == null)
            {
                return NotFound(new Exception("Game not found"));
            }
            else
            {
                return Ok(game);
            }
        }
        [Authorize(Roles = "Admin", AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet("admin/{id}")]
        public async Task<IActionResult> GetGameAdmin(int id)
        {
            var game = await _gamesService.GetGameByIdAdmin(id);
            if (game == null)
            {
                return NotFound(new Exception("Game not found"));
            }
            else
            {
                return Ok(game);
            }
        }

        //POST NEW GAME
        [Authorize(Roles = "Admin", AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost]
        public async Task<IActionResult> AddGame()
        {
            var game = await _gamesService.AddGame();
            return Ok(game);
        }

        //PUT UPDATE GAME
        [Authorize(Roles = "Admin", AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateGameById(int id, [FromBody]GameVM game)
        {
            try
            {
                var updatedGame = await _gamesService.UpdateGameById(id, game);
                if (updatedGame == null) return NotFound("Game not found");
                return Ok(updatedGame);

            }
            catch (Exception ex)
            {
                return BadRequest(new Exception(ex.Message));
            }

        }

        //DELETE GAME
        [Authorize(Roles = "Admin", AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGameById(int id)
        {
            bool deleted = await _gamesService.DeleteGameById(id);
            if (!deleted)
            {
                return BadRequest("Game not found");
            }
            return Ok();
        }

    }
}
