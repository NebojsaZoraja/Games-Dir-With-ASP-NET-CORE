using Games_Dir_api.Data.Services;
using Games_Dir_api.Data.ViewModels;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Games_Dir_api.Controllers
{
    [Route("api/games")]
    [ApiController]
    public class ReviewsController : ControllerBase
    {
        public ReviewsService _reviewsService;

        public ReviewsController(ReviewsService reviewsService)
        {
            _reviewsService = reviewsService;
        }

        //POST REVIEW

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost("{id}/reviews")]
        public async Task<IActionResult> AddReview(int id, [FromBody]ReviewVM review)
        {
            var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            bool added = await _reviewsService.AddReview(id, review, currentUserId);
            if (!added)
            {
                return BadRequest(new Exception("Review wasn't posted"));
            }
            return Ok("Review added");
        }
    }
}
