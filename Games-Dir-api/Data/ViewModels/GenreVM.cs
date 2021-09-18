using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Games_Dir_api.Data.ViewModels
{
    public class GenreVM
    {
        [Required]
        public string Name { get; set; }
    }
    public class GenreGameVM
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
