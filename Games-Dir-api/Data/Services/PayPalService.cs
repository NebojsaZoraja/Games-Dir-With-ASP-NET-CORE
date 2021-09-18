using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Games_Dir_api.Data.ViewModels;
using Microsoft.EntityFrameworkCore;
using PayPalCheckoutSdk.Core;
using PayPalCheckoutSdk.Orders;
using PayPalHttp;

namespace Games_Dir_api.Data.Services
{
    public class PayPalService
    {
        private readonly AppDbContext _context;

        public PayPalService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<OrderPaidVM> PayOrder(int orderId)
        {
            var orderDb = await _context.Orders.FirstOrDefaultAsync(o => o.Id == orderId);
            var game = await _context.Games.FirstOrDefaultAsync(g => g.Id == orderDb.GameId);

            game.NumberInStock--;
            orderDb.IsPaid = true;
            orderDb.ProductKey = Generate();
            await _context.SaveChangesAsync();

            var order = await _context.Orders.Where(o => o.Id == orderId).Select(o => new OrderPaidVM()
            {
                OrderUser = _context.ApplicationUsers.Where(u => u.Id == o.UserId).Select(u => new UserOrderVM
                {
                    Id = u.Id,
                    Name = u.UserName,
                }).FirstOrDefault(),
                TotalPrice = o.TotalPrice,
                PaymentMethod = o.PaymentMethod,
                IsPaid = o.IsPaid,
                DateCreated = DateTime.Now,
                UserId = o.UserId,
                GameId = o.GameId,
                ProductKey = o.ProductKey,
                OrderItem = _context.Games.Where(g => g.Id == o.GameId).Select(g => new GameOrderVM()
                {
                    Id = g.Id,
                    Title = g.Title,
                    Price = g.Price
                }).FirstOrDefault()
            }).FirstOrDefaultAsync();

            return order;
        }
        private static string MakeKey(int length)
        {
            Random random = new Random();
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length)
              .Select(s => s[random.Next(s.Length)]).ToArray());
        }
        private static string Generate()
        {
            return ($"{MakeKey(5)}-{MakeKey(5)}-{MakeKey(5)}");
        }
    }
}
