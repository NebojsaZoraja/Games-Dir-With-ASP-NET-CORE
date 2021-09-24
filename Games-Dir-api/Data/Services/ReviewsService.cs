using Games_Dir_api.Data.Models;
using Games_Dir_api.Data.ViewModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Games_Dir_api.Data.Services
{
    public class ReviewsService
    {
        private readonly AppDbContext _context;
        public ReviewsService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<bool> AddReview(int gameId, ReviewVM review, string userId)
        {
            var reviews = await _context.Reviews.FirstOrDefaultAsync(r => r.UserId == userId);

            if(reviews != null)
            {
                return false;
            }

            var _newReview = new Review()
            {
                GameId = gameId,
                Comment = review.Comment,
                UserId = userId,
                Rating = review.Rating,
                DateCreated = DateTime.Now,
                };
            var game = await _context.Games.FirstOrDefaultAsync(g => g.Id == gameId);
            if(game != null)
            {
                game.NumReviews++;
                game.Rating = (game.Rating + review.Rating) / game.NumReviews;

                await _context.Reviews.AddAsync(_newReview);
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }
    }
}
