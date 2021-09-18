using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Games_Dir_api.Data.ViewModels
{
    public class ReviewVM
    {
        public double Rating { get; set; }
        public string Comment { get; set; }
    }

    public class GetReviewVM
    {
        public int _Id { get; set; }
        public string Name { get; set; } 
        public double Rating { get; set; }
        public string Comment { get; set; }
        public DateTime DateCreated { get; set; }
    }
}
