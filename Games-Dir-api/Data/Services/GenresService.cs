using Games_Dir_api.Data.Models;
using Games_Dir_api.Data.ViewModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Games_Dir_api.Data.Services
{
    public class GenresService
    {
        private readonly AppDbContext _context;
        public GenresService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<GenreGameVM>> GetAllGenres()
        {
            var genres = await _context.Genres.Select(g => new GenreGameVM()
            {
                Id = g.Id,
                Name = g.Name
            }).ToListAsync();

            return genres;
        }

        public async Task<GenreGameVM> GetGenreById(int id)
        {
            var _genre = await _context.Genres.Where(g => g.Id == id).Select(genre => new GenreGameVM() {
                Id = genre.Id,
                Name = genre.Name
            }).FirstOrDefaultAsync();
            return _genre;
        }

        public async Task<Genre> AddGenre()
        {
            var _genre = new Genre()
            {
                Name = "Sample Genre"
            };
            await _context.Genres.AddAsync(_genre);
            await _context.SaveChangesAsync();
            return _genre;
        }

        public async Task<Genre> UpdateGenreById(int genreId, GenreVM genre)
        {
            var _genre = await _context.Genres.FirstOrDefaultAsync(n => n.Id == genreId);
            if (_genre != null)
            {
                _genre.Name = genre.Name;

                await _context.SaveChangesAsync();
            }
            return _genre;
        }

        public async Task<bool> DeleteGenreById(int id)
        {
            var _genre = await _context.Genres.FirstOrDefaultAsync(g => g.Id == id);

            if(_genre != null)
            {
                _context.Genres.Remove(_genre);
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }
    }
}
