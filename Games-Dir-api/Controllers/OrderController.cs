using Games_Dir_api.Data.Services;
using Games_Dir_api.Data.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using PayPalCheckoutSdk.Core;
using PayPalCheckoutSdk.Orders;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Games_Dir_api.Data;
using Microsoft.EntityFrameworkCore;
using Games_Dir_api.Data.Paging;

namespace Games_Dir_api.Controllers
{
    [Route("api/orders")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly OrdersService _ordersService;
        private readonly PayPalService _payPalService;
        private AppDbContext _context;

        public OrderController(OrdersService ordersService, PayPalService payPalService, AppDbContext context)
        {
            _ordersService = ordersService;
            _payPalService = payPalService;
            _context = context;
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet("myOrders")]
        public async Task<IActionResult> GetOrders([FromQuery] int? pageNumber)
        {
            int pageSize = 10;
            int page = pageNumber ?? 1;
            int count = await _context.Games.CountAsync();
            var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var orders = await _context.Orders.Where(o => o.UserId == currentUserId).Select(o => new OrderListVM()
            {
                Id = o.Id,
                PurchasedOn = o.DateCreated,
                Price = o.TotalPrice,
                OrderItem = _context.Games.Where(g => g.Id == o.GameId).Select(g => new GameOrderVM()
                {
                    Id = g.Id,
                    Title = g.Title,
                    Price = g.Price
                }).FirstOrDefault()
            }).Skip(pageSize * (page - 1)).Take(pageSize).ToListAsync();
            return Ok(new PaginationOrders()
            {
                Orders = orders,
                Page = page,
                Pages = Math.Ceiling(count / (double)pageSize)
            });
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrderById(int id)
        {
            var order = await _ordersService.GetOrderById(id);
            return Ok(order);
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost]
        public async Task<IActionResult> CreateOrder([FromBody]OrderVM order)
        {
            var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var newOrder = await _ordersService.CreateOrder(order, currentUserId);
            return Ok(newOrder);
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPut("{id}/pay")]
        public async Task<IActionResult> PayOrder(int id)
        {
            var paid = await _payPalService.PayOrder(id);
            return Ok(paid);
        }
    }
}
