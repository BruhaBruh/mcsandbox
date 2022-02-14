using System.Security.Claims;

using GPPlanetGQL.Discord;

using HotChocolate.AspNetCore.Authorization;

using Sandbox.Exceptions;
using Sandbox.Models;

namespace Sandbox.GraphQL
{
    public class Query
    {
        public User Me([Service] sandboxContext ctx,
                [GlobalState(nameof(ClaimsPrincipal))] ClaimsPrincipal claimsPrincipal)
        {
            var discordId = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
            if (discordId == null) throw new IternalException("Вы не авторизованы");
            var u = ctx.Users.Where(u => u.DiscordId == long.Parse(discordId)).FirstOrDefault();
            if (u == null)
            {
                var user = ctx.Users.Add(new User { DiscordId = long.Parse(discordId) });
                ctx.SaveChanges();
                return user.Entity;
            }
            return u;
        }


        [UsePaging(IncludeTotalCount = true)]
        [UseProjection]
        [UseFiltering()]
        [UseSorting()]
        public IQueryable<Bill> GetBills([Service] sandboxContext ctx,
                [GlobalState(nameof(ClaimsPrincipal))] ClaimsPrincipal claimsPrincipal)
        {
            var discordId = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
            if (discordId == null) throw new IternalException("Вы не авторизованы");
            var u = ctx.Users.Where(u => u.DiscordId == long.Parse(discordId)).FirstOrDefault();
            if (u == null) throw new DoesNotExistsException("Пользователь не найден");
            return ctx.Bills.Where(b => b.UserId == u.DiscordId);
        }

        [UsePaging(IncludeTotalCount = true)]
        [UseProjection]
        [UseFiltering()]
        [UseSorting()]
        public async Task<IQueryable<User>> GetExecutors(string? search, [Service] sandboxContext ctx, [Service] DiscordBot bot)
        {
            var userIds = await bot.SearchUsersInGuild(search ?? "");
            return ctx.Users.Where(u => u.Status != Types.UserStatus.SuperAdmin && u.Status != Types.UserStatus.Customer && userIds.Contains((ulong)u.DiscordId));
        }

        public User? GetUser(string discordId, [Service] sandboxContext ctx)
        {
            return ctx.Users.Where(u => u.DiscordId == long.Parse(discordId)).FirstOrDefault();
        }

        [UsePaging(IncludeTotalCount = true)]
        [UseProjection]
        [UseFiltering()]
        [UseSorting()]
        public IQueryable<User> GetUsers([Service] sandboxContext ctx)
        {
            return ctx.Users;
        }

        [UsePaging(IncludeTotalCount = true)]
        [UseProjection]
        [UseFiltering()]
        [UseSorting()]
        public IQueryable<Product> GetProducts([Service] sandboxContext ctx)
        {
            return ctx.Products;
        }

        [Authorize]
        [UsePaging(IncludeTotalCount = true)]
        [UseProjection]
        [UseFiltering()]
        [UseSorting()]
        public IQueryable<Order> GetOrders([Service] sandboxContext ctx,
                [GlobalState(nameof(ClaimsPrincipal))] ClaimsPrincipal claimsPrincipal)
        {
            var discordId = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
            if (discordId == null) throw new IternalException("NameIdentifier не найден");
            var u = ctx.Users.Where(u => u.DiscordId == long.Parse(discordId)).FirstOrDefault();
            if (u == null) throw new DoesNotExistsException("Пользователь не найден");
            if (u.Status == Types.UserStatus.Admin || u.Status == Types.UserStatus.SuperAdmin)
            {
                return ctx.Orders;
            }
            if (u.Status == Types.UserStatus.Executor)
            {
                return ctx.Orders.Where(o => o.ExecutorId == u.DiscordId || o.CustomerId == u.DiscordId);
            }
            return ctx.Orders.Where(o => o.CustomerId == u.DiscordId);
        }

        [Authorize]
        [UsePaging(IncludeTotalCount = true)]
        [UseProjection]
        [UseFiltering()]
        [UseSorting()]
        public IQueryable<Orderchat> GetOrderchats([Service] sandboxContext ctx,
                [GlobalState(nameof(ClaimsPrincipal))] ClaimsPrincipal claimsPrincipal)
        {
            var discordId = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
            if (discordId == null) throw new IternalException("NameIdentifier не найден");
            var u = ctx.Users.Where(u => u.DiscordId == long.Parse(discordId)).FirstOrDefault();
            if (u == null) throw new DoesNotExistsException("Пользователь не найден");
            if (u.Status == Types.UserStatus.Admin || u.Status == Types.UserStatus.SuperAdmin)
            {
                return ctx.Orderchats;
            }
            if (u.Status == Types.UserStatus.Executor)
            {
                return ctx.Orderchats.Where(o => o.Order.ExecutorId == u.DiscordId || o.Order.CustomerId == u.DiscordId);
            }
            return ctx.Orderchats.Where(o => o.Order.CustomerId == u.DiscordId);
        }


        [Authorize]
        [UsePaging(IncludeTotalCount = true)]
        [UseProjection]
        [UseFiltering()]
        [UseSorting()]
        public IQueryable<Ordermessage> GetOrdermessages(int chatId,
                [Service] sandboxContext ctx,
                [GlobalState(nameof(ClaimsPrincipal))] ClaimsPrincipal claimsPrincipal)
        {
            var discordId = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
            if (discordId == null) throw new IternalException("NameIdentifier не найден");
            var u = ctx.Users.Where(u => u.DiscordId == long.Parse(discordId)).FirstOrDefault();
            if (u == null) throw new DoesNotExistsException("Пользователь не найден");
            if (u.Status == Types.UserStatus.Admin || u.Status == Types.UserStatus.SuperAdmin)
            {
                return ctx.Ordermessages.Where(om => om.OrderchatId == chatId);
            }
            if (u.Status == Types.UserStatus.Executor)
            {
                return ctx.Ordermessages.Where(om => om.OrderchatId == chatId && (om.Orderchat.Order.ExecutorId == u.DiscordId || om.Orderchat.Order.CustomerId == u.DiscordId));
            }
            return ctx.Ordermessages.Where(om => om.OrderchatId == chatId && om.Orderchat.Order.CustomerId == u.DiscordId);
        }
    }
}
