using Games_Dir_api.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Games_Dir_api.Data.ViewModels
{
    public class OrderVM : Order
    {

    }
    public class OrderCreateVM  : Order
    {
        public UserOrderVM OrderUser { get; set; }
        public GameOrderVM OrderItem { get; set; }
    }

    public class OrderPaidVM : Order
    {
        public UserOrderVM OrderUser { get; set; }
        public GameOrderVM OrderItem { get; set; }
    }

    public class OrderListVM
    {
        public int Id { get; set; }
        public GameOrderVM OrderItem { get; set; }
        public double Price { get; set; }
        public DateTime PurchasedOn { get; set; }
    }
}
