using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Games_Dir_api.Data.Models
{
    public class Review
    {
        public int Id { get; set; }
        public double Rating { get; set; }
        public string Comment { get; set; }
        public DateTime DateCreated { get; set; }

        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
        public int GameId { get; set; }
        public Game Game { get; set; }
    }
}
