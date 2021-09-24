using Games_Dir_api.Data.Models;
using Games_Dir_api.Data.Paging;
using Games_Dir_api.Data.ViewModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Games_Dir_api.Data.Services
{
    public class GamesService
    {
        private readonly AppDbContext _context;
        public GamesService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Game> AddGame()
        {
            var _game = new Game()
            {
                Title = "Sample title",
                Publisher = "Sample publisher",
                Price = 0,
                GenreId = await _context.Genres.Select(g => g.Id).FirstOrDefaultAsync(),
                Image = "/images/sample.jpg",
                Rating = 0,
                Description = "Sample desc",
                NumReviews = 0,
                NumberInStock = 0,
                MinRequirements = "sample minRequirements",
                RecRequirements = "sample recRequirements",
                DateAdded = DateTime.Now
            };
            await _context.Games.AddAsync(_game);
            await _context.SaveChangesAsync();

            return _game;
        }

        public async Task<List<Game>> GetHomepage()
        {
            var homepageList = await _context.Games.Take(25).ToListAsync();
            return homepageList;
        }

        public async Task<List<GameAdminVM>> GetAllGames(string keyword)
        {
            var allGames = await _context.Games.Select(game => new GameAdminVM()
            {
                Id = game.Id,
                Title = game.Title,
                Publisher = game.Publisher,
                Price = game.Price,
                Genre = _context.Genres.Select(g => new GenreGameVM()
                {
                    Id = game.GenreId,
                    Name = game.Genre.Name
                }).FirstOrDefault(),
                Image = game.Image,
                Description = game.Description,
                NumberInStock = game.NumberInStock,
                MinRequirements = game.MinRequirements,
                RecRequirements = game.RecRequirements,
                Rating = game.Rating,
                NumReviews = game.NumReviews,
            }).ToListAsync();

            if (!string.IsNullOrEmpty(keyword))
            {
                allGames = allGames.Where(n => n.Title.Contains(keyword, StringComparison.CurrentCultureIgnoreCase)).ToList();
            }

            return allGames;
        }

        public async Task<List<FullGameVM>> GetAllGames()
        {
            var allGames = await _context.Games.Select(game => new FullGameVM()
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
            }).ToListAsync();
            return allGames;
        }

        public async Task<FullGameVM> GetGameById(int gameId)
        {
            var games = await _context.Games.Where(n => n.Id == gameId).Select(game => new FullGameVM()
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
                Reviews = game.Reviews.Select(r => new GetReviewVM()
                {
                    _Id = r.Id,
                    Comment = r.Comment,
                    Name = _context.ApplicationUsers.Where(u => u.Id == r.UserId).Select(user => user.UserName).FirstOrDefault(),
                    Rating = r.Rating,
                    DateCreated = r.DateCreated
                }).ToList()
            }).FirstOrDefaultAsync();

            return games;
        }

        public async Task<GameAdminVM> GetGameByIdAdmin(int gameId)
        {

            var games = await _context.Games.Where(n => n.Id == gameId).Select( game => new GameAdminVM()
            {
                Id = game.Id,
                Title = game.Title,
                Publisher = game.Publisher,
                Price = game.Price,
                Genre = _context.Genres.Select(g => new GenreGameVM()
                {
                    Id = game.GenreId,
                    Name = game.Genre.Name
                }).FirstOrDefault(),
                Image = game.Image,
                Description = game.Description,
                NumberInStock = game.NumberInStock,
                MinRequirements = game.MinRequirements,
                RecRequirements = game.RecRequirements,
                Rating = game.Rating,
                NumReviews = game.NumReviews,
            }).FirstOrDefaultAsync();
            return games;
        }

        public async Task<Game> UpdateGameById(int gameId, GameVM game)
        {
            var _game = await _context.Games.FirstOrDefaultAsync(n => n.Id == gameId);
            if(_game != null)
            {
                _game.Title = game.Title;
                _game.Publisher = game.Publisher;
                _game.GenreId = game.GenreId;
                _game.Price = game.Price;
                _game.Image = game.Image;
                _game.Description = game.Description;
                _game.NumberInStock = game.NumberInStock;
                _game.MinRequirements = game.MinRequirements;
                _game.RecRequirements = game.RecRequirements;
                _game.DateAdded = DateTime.Now;

                await _context.SaveChangesAsync();
            }
            return _game;
        } 
        public async Task<bool> DeleteGameById(int gameId)
        {
            var _game = await _context.Games.FirstOrDefaultAsync(n => n.Id == gameId);
            if(_game != null)
            {
                 _context.Games.Remove(_game);
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }
    }
}
