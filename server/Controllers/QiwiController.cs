using GPPlanetGQL.Discord;

using HotChocolate.Subscriptions;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using Qiwi.BillPayments.Client;
using Qiwi.BillPayments.Model;
using Qiwi.BillPayments.Model.In;
using Qiwi.BillPayments.Utils;

using Sandbox.Models;

using System.Security.Claims;

using QiwiBill = Qiwi.BillPayments.Model.Bill;

namespace Sandbox.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QiwiController : ControllerBase
    {
        private readonly BillPaymentsClient _client;
        private readonly IConfiguration _config;
        private readonly sandboxContext _ctx;
        private readonly DiscordBot _bot;
        private readonly ITopicEventSender _sender;
        private readonly ILogger<QiwiController> _logger;
        private readonly string _secretKey;

        public QiwiController(IConfiguration config, ILogger<QiwiController> logger, [Service] sandboxContext ctx, [Service] DiscordBot bot, [Service] ITopicEventSender sender)
        {
            _bot = bot;
            _config = config;
            _sender = sender;
            _secretKey = Environment.GetEnvironmentVariable("QiwiSecret") ?? "";
            _client = BillPaymentsClientFactory.Create(
                secretKey: _secretKey
            ); ;
            _ctx = ctx;
            _logger = logger;
        }

        [HttpGet("create")]
        [Authorize(AuthenticationSchemes = "Discord")]
        public async Task<IActionResult> Create(
                [FromQuery(Name = "amount")] int amount
            )
        {
            // https://localhost:7015/api/qiwi/create?amount=10
            if (amount < 1 || amount > 50000)
            {
                return BadRequest(new
                {
                    Message = "Сумма должна быть натуральным числом от 1 до 50.000"
                });
            }
            if (amount % 1 != 0) throw new FormatException("Сумма должна быть целочисленным числом");
            var discordId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
            if (discordId == null) return BadRequest(new { Message = "Ошибка авторизации" });
            var user = _ctx.Users.Where(u => u.DiscordId == long.Parse(discordId.Value)).FirstOrDefault();
            if (user == null) return BadRequest(new { Message = $"Пользоватиля с DiscordID {discordId.Value} не существует" });

            var b = _ctx.Bills.Add(new Models.Bill
            {
                Amount = amount,
                UserId = user.DiscordId
            });

            _ctx.SaveChanges();

            var link = string.Concat(
                    Request.Scheme,
                    "://",
                    Request.Host.ToUriComponent(),
                    Request.PathBase.ToUriComponent());
            try
            {
                var response = _client.CreateBill(
                    info: new CreateBillInfo
                    {
                        BillId = b.Entity.BillId.ToString(),
                        Amount = new MoneyAmount
                        {
                            ValueDecimal = amount,
                            CurrencyEnum = CurrencyEnum.Rub
                        },
                        Comment = $"Пополнение счета пользователю с ID {user.DiscordId}",
                        ExpirationDateTime = DateTime.Now.AddDays(1),
                        SuccessUrl = new Uri(link),
                    }
                );
                return Redirect(response.PayUrl.AbsoluteUri);
            } catch (Exception ex)
            {
                _ctx.Bills.Remove(b.Entity);
                _ctx.SaveChanges();
                return Redirect(link);
            }
        }

        [HttpPost("callback")]
        public async Task<IActionResult> Callback([FromBody] NotificationBody body)
        {
            var notification = new Notification
            {
                Bill = new QiwiBill
                {
                    BillId = body.bill.billId,
                    SiteId = body.bill.siteId,
                    Amount = new MoneyAmount
                    {
                        ValueDecimal = decimal.Parse(body.bill.amount.value.Replace('.', ',')),
                        ValueString = body.bill.amount.value,
                        CurrencyEnum = CurrencyEnum.Rub,
                        CurrencyString = body.bill.amount.currency
                    },
                    Status = new BillStatus
                    {
                        ValueEnum = GetBillStatusEnum(body.bill.status.value),
                        ValueString = body.bill.status.value,
                        DateTime = DateTime.Parse(body.bill.status.changedDateTime)
                    }
                },
                Version = body.version
            };

            string sign = Request.Headers.Where(h => h.Key == "X-Api-Signature-SHA256").Select(h => h.Value).FirstOrDefault();
            if (!BillPaymentsUtils.CheckNotificationSignature(sign, notification, _secretKey)) return BadRequest(new { Error = "Неверная подпись" });
            var bill = _ctx.Bills.Where(b => b.BillId == int.Parse(notification.Bill.BillId)).FirstOrDefault();
            if (bill == null) return BadRequest(new { Error = "Данного счета не существует" });
            if (bill.Status == "PAID") return Ok(new { Message = "ok" });
            switch (notification.Bill.Status.ValueString)
            {
                case "EXPIRED":
                    {
                        _ctx.Remove(bill);
                        _ctx.SaveChanges();
                        break;
                    }
                case "REJECTED":
                    {
                        _ctx.Remove(bill);
                        _ctx.SaveChanges();
                        break;
                    }
                case "PAID":
                    {
                        bill.Status = "PAID";
                        var user = _ctx.Users.Where(u => u.DiscordId == bill.UserId).FirstOrDefault();
                        if (user == null) return BadRequest(new { Error = "Данного пользователя не существует" });
                        user.Money += bill.Amount;
                        _ctx.SaveChanges();
                        break;
                    }
            }
            return Ok(new
            {
                Message = "ok"
            });
        }

        private static BillStatusEnum GetBillStatusEnum(string status)
        {
            switch (status)
            {
                case "WAITING": { return BillStatusEnum.Waiting; }
                case "PAID": { return BillStatusEnum.Paid; }
                case "EXPIRED": { return BillStatusEnum.Expired; }
                case "REJECTED": { return BillStatusEnum.Rejected; }
                default: { return BillStatusEnum.Waiting; }
            }
        }

        public class NotificationBody
        {
            public NotificationBill bill { get; set; }
            public string version { get; set; }
        }

        public class NotificationBill
        {
            public string siteId { get; set; }
            public string billId { get; set; }
            public NotificationAmount amount { get; set; }
            public NotificationStatus status { get; set; }
        }

        public class NotificationAmount
        {
            public string value { get; set; }
            public string currency { get; set; }
        }

        public class NotificationStatus
        {
            public string value { get; set; }
            public string changedDateTime { get; set; }
        }
    }
}
