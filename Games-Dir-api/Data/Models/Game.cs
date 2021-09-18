using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Games_Dir_api.Data.Models
{
    public class Game
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Publisher { get; set; }
        public double Price { get; set; }
        public string Image { get; set; }
        public string Description { get; set; }
        public double? Rating { get; set; }
        public int NumberInStock { get; set; }
        public int? NumReviews { get; set; }
        public string MinRequirements { get; set; }
        public string RecRequirements { get; set; }
        public DateTime DateAdded { get; set; }

        public int GenreId { get; set; }
        public Genre Genre { get; set; }
        public List<Review> Reviews { get; set; }
    }
}
