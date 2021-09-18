using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Games_Dir_api.Data.Models
{
    public class Genre
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public List<Game> Games { get; set; }
    }
}
