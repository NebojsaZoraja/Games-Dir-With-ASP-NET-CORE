using Games_Dir_api.Data.Models;
using Games_Dir_api.Data.ViewModels;
using PayPalCheckoutSdk.Core;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Games_Dir_api.Data.Services
{
    public class OrdersService
    {

        private readonly AppDbContext _context;
        

        public OrdersService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<OrderCreateVM> GetOrderById(int id)
        {
            var order = await _context.Orders.Where(o => o.Id == id).Select(o => new OrderCreateVM()
            {
                Id = o.Id,
                OrderUser = _context.ApplicationUsers.Where(u => u.Id == o.UserId).Select(u => new UserOrderVM
                {
                    Id = u.Id,
                    Name = u.UserName,
                }).FirstOrDefault(),
                TotalPrice = o.TotalPrice,
                PaymentMethod = o.PaymentMethod,
                IsPaid = o.IsPaid,
                ProductKey = o.ProductKey,
                DateCreated = DateTime.Now,
                UserId = o.UserId,
                GameId = o.GameId,
                OrderItem = _context.Games.Where(g => g.Id == o.GameId).Select(g => new GameOrderVM()
                {
                    Id = g.Id,
                    Title = g.Title,
                    Price = g.Price
                }).FirstOrDefault()
            }).FirstOrDefaultAsync();
            return order;
        }

        public async Task<Order> CreateOrder(OrderVM order, string userId)
        {
            var newOrder = new OrderCreateVM()
            {
                OrderUser = await _context.ApplicationUsers.Where(u => u.Id == userId).Select(u => new UserOrderVM
                {
                    Id = u.Id,
                    Name = u.UserName,
                }).FirstOrDefaultAsync(),
                TotalPrice = _context.Games.Where(g => g.Id == order.GameId).Select(p => p.Price).FirstOrDefault(),
                PaymentMethod = order.PaymentMethod,
                IsPaid = false,
                ProductKey = " ",
                DateCreated = DateTime.Now,
                UserId = userId,
                GameId = order.GameId,
                OrderItem = await _context.Games.Where(g => g.Id == order.GameId).Select(g => new GameOrderVM()
                {
                    Id = g.Id,
                    Title = g.Title,
                    Price = g.Price
                }).FirstOrDefaultAsync()
            };
            await _context.Orders.AddAsync(newOrder);
            await _context.SaveChangesAsync();

            return newOrder;
        }
    }
}
