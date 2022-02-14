using System.Security.Claims;

using HotChocolate.Subscriptions;

using Sandbox.Exceptions;
using Sandbox.Models;
using Sandbox.Services;
using Sandbox.Types;

namespace Sandbox.GraphQL
{
    public class Mutation
    {
        public bool CreateProduct(ProductInputs.CreateEdit input, [Service] sandboxContext ctx,
                [GlobalState(nameof(ClaimsPrincipal))] ClaimsPrincipal claimsPrincipal, [Service] ImgBBService imgbb)
        {
            var discordId = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
            if (discordId == null) throw new IternalException("Вы не авторизованы");
            var u = ctx.Users.Where(u => u.DiscordId == long.Parse(discordId)).FirstOrDefault();
            if (u == null) throw new DoesNotExistsException("Аккаунт не найден");
            if (u.Status != UserStatus.SuperAdmin && u.Status != UserStatus.Admin) throw new ForbiddenException("У вас нет прав!");
            var image = imgbb.UploadImage(input.Image).Result;
            if (image == null) throw new IternalException("Изображение не смогло загрузиться");

            ctx.Products.Add(new Product
            {
                Name = input.Name,
                Description = input.Description,
                Type = input.Type,
                Cost = input.Cost,
                CostBy = input.CostBy,
                CostStart = input.CostStart,
                CostEnd = input.CostEnd,
                Image = image,
            });

            ctx.SaveChanges();
            return true;
        }

        public bool EditProduct(int id, ProductInputs.CreateEdit input, [Service] sandboxContext ctx,
                [GlobalState(nameof(ClaimsPrincipal))] ClaimsPrincipal claimsPrincipal, [Service] ImgBBService imgbb)
        {
            var discordId = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
            if (discordId == null) throw new IternalException("Вы не авторизованы");
            var u = ctx.Users.Where(u => u.DiscordId == long.Parse(discordId)).FirstOrDefault();
            if (u == null) throw new DoesNotExistsException("Аккаунт не найден");
            if (u.Status != UserStatus.SuperAdmin && u.Status != UserStatus.Admin) throw new ForbiddenException("У вас нет прав!");
            var product = ctx.Products.Where(p => p.ProductId == id).FirstOrDefault();
            if (product == null) throw new DoesNotExistsException("Товар не найден");
            product.Name = input.Name;
            product.Description = input.Description;
            product.Type = input.Type;
            product.Cost = input.Cost;
            product.CostBy = input.CostBy;
            product.CostStart = input.CostStart;
            product.CostEnd = input.CostEnd;
            if (product.Image != input.Image && input.Image.EndsWith('='))
            {
                var image = imgbb.UploadImage(input.Image).Result;
                if (image == null) throw new IternalException("Изображение не смогло загрузиться");
                product.Image = image;
            }
            ctx.SaveChanges();
            return true;
        }

        public bool RemoveProduct(int id, [Service] sandboxContext ctx,
                [GlobalState(nameof(ClaimsPrincipal))] ClaimsPrincipal claimsPrincipal)
        {
            var discordId = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
            if (discordId == null) throw new IternalException("Вы не авторизованы");
            var u = ctx.Users.Where(u => u.DiscordId == long.Parse(discordId)).FirstOrDefault();
            if (u == null) throw new DoesNotExistsException("Аккаунт не найден");
            if (u.Status != UserStatus.SuperAdmin && u.Status != UserStatus.Admin) throw new ForbiddenException("У вас нет прав!");
            var product = ctx.Products.Where(p => p.ProductId == id).FirstOrDefault();
            if (product == null) throw new DoesNotExistsException("Товар не найден");

            ctx.Products.Remove(product);

            ctx.SaveChanges();
            return true;
        }

        public Orderchat CreateOrder(int productId, [Service] sandboxContext ctx,
                [GlobalState(nameof(ClaimsPrincipal))] ClaimsPrincipal claimsPrincipal)
        {
            var discordId = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
            if (discordId == null) throw new IternalException("Вы не авторизованы");
            var u = ctx.Users.FirstOrDefault(u => u.DiscordId == long.Parse(discordId));
            if (u == null) throw new DoesNotExistsException("Аккаунт не найден");
            var product = ctx.Products.FirstOrDefault(p => p.ProductId == productId);
            if (product == null) throw new DoesNotExistsException("Товар не найден");

            var order = ctx.Orders.Add(new Order
            {
                CustomerId = u.DiscordId,
                Money = 0,
                ProductId = product.ProductId,
                Status = OrderStatus.IsConsidered
            });
            ctx.SaveChanges();
            var orderChat = ctx.Orderchats.Add(new Orderchat
            {
                OrderId = order.Entity.OrderId
            });
            ctx.SaveChanges();
            return orderChat.Entity;
        }

        public bool EditOrder(int orderId, OrderInputs.OrderEdit input, [Service] sandboxContext ctx,
                [GlobalState(nameof(ClaimsPrincipal))] ClaimsPrincipal claimsPrincipal)
        {
            var discordId = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
            if (discordId == null) throw new IternalException("Вы не авторизованы");
            var u = ctx.Users.FirstOrDefault(u => u.DiscordId == long.Parse(discordId));
            if (u == null) throw new DoesNotExistsException("Аккаунт не найден");
            if (u.Status != UserStatus.SuperAdmin && u.Status != UserStatus.Admin) throw new ForbiddenException("У вас нет прав!");

            var order = ctx.Orders.Where(o => o.OrderId == orderId).FirstOrDefault();
            if (order == null) throw new DoesNotExistsException("Заказ не найден");
            if (order.Status == OrderStatus.Success || order.Status == OrderStatus.Rejected) throw new ForbiddenException("Нельзя редактировать из-за статуса");
            if (input.Status != null)
            {
                order.Status = (OrderStatus)input.Status;
                if (order.Status == OrderStatus.Success)
                {
                    var ex = ctx.Users.Where(u => u.DiscordId == order.ExecutorId).FirstOrDefault();
                    if (ex == null) throw new DoesNotExistsException("Исполнитель не найден");
                    var c = ctx.Users.Where(u => u.DiscordId == order.CustomerId).FirstOrDefault();
                    if (c == null) throw new DoesNotExistsException("Заказчик не найден");
                    c.FrozenMoney -= order.Money;
                    ex.Money += order.Money;
                    ctx.SaveChanges();
                    return true;
                }
                if (order.Status == OrderStatus.Rejected)
                {
                    var c = ctx.Users.Where(u => u.DiscordId == order.CustomerId).FirstOrDefault();
                    if (c == null) throw new DoesNotExistsException("Заказчик не найден");
                    c.FrozenMoney -= order.Money;
                    c.Money += order.Money;
                    ctx.SaveChanges();
                    return true;
                }
            }
            if (input.ExecutorId != null && order.ExecutorId.ToString() != input.ExecutorId)
            {
                var ex = ctx.Users.Where(u => u.Status != UserStatus.Customer && u.Status != UserStatus.SuperAdmin && u.DiscordId == long.Parse(input.ExecutorId)).FirstOrDefault();
                if (ex == null) throw new DoesNotExistsException("Данного исполнителя не найдено");
                order.ExecutorId = ex.DiscordId;
            }
            if (input.Money != null && order.Money != input.Money)
            {
                if (order.Status != OrderStatus.IsConsidered && order.Status != OrderStatus.InProgress) throw new UserInputException("Цену можно ставить только в статусе \"Ожидание\" и \"Выполняется\"");
                if (input.Money < 1) throw new UserInputException("Минимальная цена 1");
                var customer = ctx.Users.Where(u => u.DiscordId == order.CustomerId).FirstOrDefault();
                customer.Money += order.Money;
                customer.FrozenMoney -= order.Money;
                if (customer.Money < (int)input.Money) throw new ForbiddenException($"У заказчика не хватает {input.Money - customer.Money} рублей");
                order.Money = (int)input.Money;
                customer.Money -= order.Money;
                customer.FrozenMoney += order.Money;
            }
            if (input.ExpiredAtInDays != null && input.ExpiredAtInDays >= 0)
            {
                order.ExpiredAt = DateTime.UtcNow.AddDays((double)input.ExpiredAtInDays);
            }
            ctx.SaveChanges();
            return true;
        }

        public bool EditUser(string userId, UserStatus status, int money, int frozen, [Service] sandboxContext ctx,
                [GlobalState(nameof(ClaimsPrincipal))] ClaimsPrincipal claimsPrincipal)
        {
            var discordId = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
            if (discordId == null) throw new IternalException("Вы не авторизованы");
            var a = ctx.Users.FirstOrDefault(u => u.DiscordId == long.Parse(discordId));
            if (a == null) throw new DoesNotExistsException("Аккаунт не найден");
            if (a.Status != UserStatus.SuperAdmin && a.Status != UserStatus.Admin) throw new ForbiddenException("У вас нет прав!");

            Console.WriteLine(userId);
            Console.WriteLine(status);
            Console.WriteLine(money);
            Console.WriteLine(frozen);
            var u = ctx.Users.FirstOrDefault(u => u.DiscordId == long.Parse(userId));
            if (u == null) throw new DoesNotExistsException("Аккаунт не найден");

            u.Status = status;
            u.Money = money;
            u.FrozenMoney = frozen;

            ctx.SaveChanges();
            return true;
        }

        public bool SendMessage(int chatId, string message, int? replyMessageId, [Service] sandboxContext ctx,
                [GlobalState(nameof(ClaimsPrincipal))] ClaimsPrincipal claimsPrincipal, [Service] ITopicEventSender sender)
        {
            var discordId = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
            if (discordId == null) throw new IternalException("Вы не авторизованы");
            var u = ctx.Users.FirstOrDefault(u => u.DiscordId == long.Parse(discordId));
            if (u == null) throw new DoesNotExistsException("Аккаунт не найден");

            var chat = ctx.Orderchats.FirstOrDefault(c => c.OrderchatId == chatId);
            if (chat == null) throw new DoesNotExistsException("Чат не найден");
            var order = ctx.Orders.FirstOrDefault(o => o.OrderId == chat.OrderId);
            if (order == null) throw new DoesNotExistsException("Заказ не найден");
            if (order.CustomerId != u.DiscordId && order.ExecutorId != u.DiscordId && u.Status != UserStatus.SuperAdmin && u.Status != UserStatus.Admin) throw new ForbiddenException("У вас нет прав!");

            var replyMessage = ctx.Ordermessages.FirstOrDefault(m => m.OrdermessageId == replyMessageId);

            var msg = ctx.Ordermessages.Add(new Ordermessage
            {
                OrderchatId = chat.OrderchatId,
                OwnerId = u.DiscordId,
                ReplyMessageId = replyMessage?.ReplyMessageId,
                ReplyMessage = replyMessage,
                Message = message
            });

            ctx.SaveChanges();

            _ = sender.SendAsync($"{chat.OrderchatId}_UpdatedChatMessage", msg.Entity);
            return true;
        }

        public bool ReadMessage(int msgId, [Service] sandboxContext ctx,
                [GlobalState(nameof(ClaimsPrincipal))] ClaimsPrincipal claimsPrincipal, [Service] ITopicEventSender sender)
        {
            var discordId = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
            if (discordId == null) throw new IternalException("Вы не авторизованы");
            var u = ctx.Users.FirstOrDefault(u => u.DiscordId == long.Parse(discordId));
            if (u == null) throw new DoesNotExistsException("Аккаунт не найден");

            var msg = ctx.Ordermessages.FirstOrDefault(m => m.OrdermessageId == msgId);
            if (msg == null) throw new DoesNotExistsException("Сообщение не найдено");
            if (msg.ReadedUserIds.Contains(u.DiscordId)) return false;
            msg.ReadedUserIds = msg.ReadedUserIds.Append(u.DiscordId).Distinct().ToArray();
            ctx.SaveChanges();

            _ = sender.SendAsync($"{msg.OrderchatId}_UpdatedChatMessage", msg);
            return true;
        }
    }
}
