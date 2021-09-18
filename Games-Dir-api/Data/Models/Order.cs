using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Games_Dir_api.Data.Models
{
    public class Order
    {
        public int Id { get; set; }
        public string PaymentMethod { get; set; }
        public double TotalPrice { get; set; }
        public bool IsPaid { get; set; }
        public string ProductKey { get; set; }
        public DateTime DateCreated { get; set; }

        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
        public int GameId { get; set; }
        public Game Game { get; set; }
    }
}
