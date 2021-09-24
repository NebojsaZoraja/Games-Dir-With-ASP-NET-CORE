using Games_Dir_api.Data.Services;
using Games_Dir_api.Data.ViewModels;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Games_Dir_api.Controllers
{
    [Route("api/genres")]
    [ApiController]
    public class GenresController : ControllerBase
    {
        public GenresService _genresService;
        public GenresController(GenresService genresService)
        {
            _genresService = genresService;
        }

        //GET ALL GENRES

        [HttpGet]
        public async Task<IActionResult> GetAllGenres()
        {
            var genres = await _genresService.GetAllGenres();
            return Ok(genres);
        }

        //GET GENRE BY ID
        [Authorize(Roles = "Admin", AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetGenreById(int id)
        {
            var genre = await _genresService.GetGenreById(id);
            if(genre == null)
            {
                return NotFound(new Exception("Genre not found"));
            }
            return Ok(genre);
        }

        //POST NEW GENRE
        [Authorize(Roles = "Admin", AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost]
        public async Task<IActionResult> AddGenre()
        {
            var genre = await _genresService.AddGenre();
            return Created(nameof(AddGenre),genre);
        }

        //PUT UPDATE GENRE

        [Authorize(Roles = "Admin", AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateGenreById(int id, [FromBody]GenreVM genre)
        {
            var updatedGenre = await _genresService.UpdateGenreById(id, genre);
            if (updatedGenre == null) return NotFound();
            
            return Ok(updatedGenre);
        }

        //DELETE GENRE

        [Authorize(Roles = "Admin", AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGenreById(int id)
        {
            bool deleted = await _genresService.DeleteGenreById(id);
            if (!deleted)
            {
                return BadRequest(new Exception("Genre could not be deleted because there is a game associated with it."));
            }
            return Ok();
        }
    }
}
