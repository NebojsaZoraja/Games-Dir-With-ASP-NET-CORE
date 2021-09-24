using Games_Dir_api.Configuration;
using Games_Dir_api.Data;
using Games_Dir_api.Data.Models;
using Games_Dir_api.Data.Paging;
using Games_Dir_api.Data.ViewModels;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Games_Dir_api.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly JwtConfig _jwtConfig;
        private readonly AppDbContext _context;

        public AuthController(UserManager<IdentityUser> userManager, IOptionsMonitor<JwtConfig> optionsMonitor, AppDbContext context)
        {
            _userManager = userManager;
            _jwtConfig = optionsMonitor.CurrentValue;
            _context = context;
        }

        //REGISTER

        [HttpPost]
        public async Task<IActionResult> Register([FromBody] UserRegistrationVM user)
        {
            if (ModelState.IsValid)
            {
                var existingUser = await _userManager.FindByEmailAsync(user.Email);
                var existingName = await _userManager.FindByNameAsync(user.Name);

                if(existingUser != null)
                {
                    return BadRequest(new Exception("Email already in use"));
                }
                if (existingName != null)
                {
                    return BadRequest(new Exception("Username already in use"));
                }
                var count = await _context.ApplicationUsers.CountAsync();
                var newUser = new ApplicationUser() { Email = user.Email, UserName = user.Name, DateCreated = DateTime.Now };
                if (count == 0)
                {
                    newUser.IsAdmin = true;
                }
                var isCreated = await _userManager.CreateAsync(newUser, user.Password);
                
                if (isCreated.Succeeded)
                {
                    var jwtToken = await GenerateToken(newUser);
                    if(newUser.IsAdmin == true)
                    {
                        await _userManager.AddToRoleAsync(newUser, "Admin");
                    }
                    return Ok(new UserRegistrationResponseVM()
                    {
                        Success = true,
                        Token = jwtToken,
                        Email = newUser.Email,
                        Name = newUser.UserName,
                        IsAdmin = await _userManager.IsInRoleAsync(newUser, "Admin"),
                    });
                }
                else
                {
                    return BadRequest(new Exception("User not created"));
                }

            }

            return BadRequest(new Exception("Invalid data"));
        }

        //LOGIN
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginRequestVM user)
        {
            if (ModelState.IsValid)
            {
                var existingUser = await _userManager.FindByEmailAsync(user.Email);
                
                if(existingUser == null)
                {
                    return BadRequest(new Exception("Invalid email or password"));
                }

                var isCorrect = await _userManager.CheckPasswordAsync(existingUser, user.Password);

                if (!isCorrect)
                {
                    return BadRequest(new Exception("Invalid email or password"));
                }

                var jwtToken = await GenerateToken(existingUser);

                return Ok(new UserLoginResponseVM()
                {
                    Email = existingUser.Email,
                    Name = existingUser.UserName,
                    Token = jwtToken,
                    IsAdmin = await _userManager.IsInRoleAsync(existingUser, "Admin"),
                });
            }
            return BadRequest(new Exception("Invalid data"));
        }
        
        //GET ALL USERS
        [Authorize(Roles = "Admin", AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet]
        public async Task<IActionResult> ListUsersAdmin([FromQuery] int? pageNumber)
        {
            int pageSize = 10;
            int page = pageNumber ?? 1;
            int count = await _context.ApplicationUsers.CountAsync();
            var users = await _context.ApplicationUsers.Select(u => new UserProfileEditAdminVM()
            {
                Id = u.Id,
                Email = u.Email,
                Name = u.UserName,
                IsAdmin = u.IsAdmin,
                DateCreated = u.DateCreated,
            }).OrderBy(u => u.DateCreated).Skip(pageSize * (page-1)).Take(pageSize).ToListAsync();
            return Ok(new PaginationUsers()
            {
                Users = users,
                Page = page,
                Pages = Math.Ceiling(count / (double)pageSize)
            });
        }

        [Authorize(Roles = "Admin", AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserDetails(string id)
        {
            var user = await _context.ApplicationUsers.Where(u => u.Id == id).Select(u => new UserProfileEditAdminVM()
            {
                Id = u.Id,
                Email = u.Email,
                Name = u.UserName,
                IsAdmin = u.IsAdmin,
            }).FirstOrDefaultAsync();
            return Ok(user);
        }


        //USER PROFILE
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet("profile")]
        public async Task<IActionResult> GetUserProfile()
        {
            var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _userManager.FindByIdAsync(currentUserId);
            if(user != null)
            {
                return Ok(new UserProfileVM()
                {
                    Id = user.Id,
                    Name = user.UserName,
                    Email = user.Email,
                });
            }
            return NotFound(new Exception("Invalid token, please log in again"));
        }

        //EDIT USER PROFILE

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPut("profile")]
        public async Task<IActionResult> UpdateUserProfile([FromBody] UserProfileEditVM updatedUser)
        {
            var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _context.ApplicationUsers.Where(u => u.Id == currentUserId).FirstOrDefaultAsync(); 
            if (user != null)
            {
                user.UserName = updatedUser.Name;
                user.Email = updatedUser.Email;
                if(!String.IsNullOrEmpty(updatedUser.Password))
                {
                    user.PasswordHash = _userManager.PasswordHasher.HashPassword(user, updatedUser.Password);
                }
                else
                {
                    user.PasswordHash = user.PasswordHash;
                }

                await _context.SaveChangesAsync();

                return Ok(new UserProfileVM()
                {
                    Id = user.Id,
                    Name = user.UserName,
                    Email = user.Email,
                });
            }
            return NotFound(new Exception("Invalid user"));

        }

        //EDIT USER ADMIN
        [Authorize(Roles = "Admin", AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUserAdmin(string id, [FromBody] UserProfileEditAdminVM userUpdate)
        {
            var user = await _context.ApplicationUsers.FirstOrDefaultAsync(u => u.Id == id);

            if (user != null)
            {
                user.UserName = userUpdate.Name;
                user.Email = userUpdate.Email;
                var userIdentity = await _userManager.FindByIdAsync(user.Id);

                if (userUpdate.IsAdmin)
                {
                    await _userManager.AddToRoleAsync(userIdentity, "Admin");
                    user.IsAdmin = true;
                }
                if (!userUpdate.IsAdmin)
                {
                    await _userManager.RemoveFromRoleAsync(userIdentity, "Admin");
                    user.IsAdmin = false;
                }

                await _context.SaveChangesAsync();

                return Ok("User updated successfully");
            }
            return BadRequest(new Exception("Invalid User"));
        }

        //DELETE USER ADMIN
        [Authorize(Roles = "Admin", AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserAdmin(string id)
        {
            var user = await _context.ApplicationUsers.FirstOrDefaultAsync(u => u.Id == id);

            if(user != null)
            {
                _context.Remove(user);
                await _context.SaveChangesAsync();
                return Ok("User deleted successfully!");
            }
            return NotFound(new Exception("User not found"));
        }


        private async Task<List<Claim>> GetClaims(IdentityUser user)
        {
            var claims = new List<Claim>
            {
                    new Claim("Id", user.Id),
                    new Claim(JwtRegisteredClaimNames.Email, user.Email),
                    new Claim(JwtRegisteredClaimNames.Sub, user.Id),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };

            var roles = await _userManager.GetRolesAsync(user);
            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            return claims;

        }

        private async Task<string> GenerateToken(IdentityUser user)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();

            var key = Encoding.ASCII.GetBytes(_jwtConfig.Secret);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(await GetClaims(user)),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
            };

            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            var jwtToken = jwtTokenHandler.WriteToken(token);

            return jwtToken;
        }
    }
}
