using Games_Dir_api.Data.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Games_Dir_api.Data.Paging
{
    public class PaginationGames
    {
        public List<FullGameVM> Games { get; set; }
        public int Page { get; set; }
        public double Pages { get; set; }
    }

    public class PaginationUsers
    {
        public List<UserProfileEditAdminVM> Users { get; set; }
        public int Page { get; set; }
        public double Pages { get; set; }
    }

    public class PaginationOrders
    {
        public List<OrderListVM> Orders { get; set; }
        public int Page { get; set; }
        public double Pages { get; set; }
    }
}
