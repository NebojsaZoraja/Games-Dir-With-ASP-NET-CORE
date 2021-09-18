using Games_Dir_api.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Games_Dir_api.Data.ViewModels
{
    public class GameVM
    {
        public string Title { get; set; }
        public string Publisher { get; set; }
        public int GenreId { get; set; }
        public double Price { get; set; }
        public double? Rating { get; set; }
        public int? NumReviews { get; set; }
        public string Image { get; set; }
        public string Description { get; set; }
        public int NumberInStock { get; set; }
        public string MinRequirements { get; set; }
        public string RecRequirements { get; set; }
    }

    public class FullGameVM
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Publisher { get; set; }
        public double Price { get; set; }
        public string Image { get; set; }
        public string Description { get; set; }
        public int NumberInStock { get; set; }
        public double? Rating { get; set; }
        public int? NumReviews { get; set; }
        public string MinRequirements { get; set; }
        public string RecRequirements { get; set; }
        public string GenreName { get; set; }
        public List<GetReviewVM> Reviews { get; set; }
    }

    public class GameAdminVM
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Publisher { get; set; }
        public double Price { get; set; }
        public string Image { get; set; }
        public string Description { get; set; }
        public int NumberInStock { get; set; }
        public double? Rating { get; set; }
        public int? NumReviews { get; set; }
        public string MinRequirements { get; set; }
        public string RecRequirements { get; set; }
        public GenreGameVM Genre { get; set; }

    }

    public class GameOrderVM
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public double Price { get; set; }
    }
}
