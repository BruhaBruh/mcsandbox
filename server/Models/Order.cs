using System.ComponentModel.DataAnnotations.Schema;

using Sandbox.Types;

namespace Sandbox.Models
{
    public partial class Order
    {
        public Order()
        {
            Orderchats = new HashSet<Orderchat>();
        }

        public int OrderId { get; set; }
        public int Money { get; set; }
        public DateTime? ExpiredAt { get; set; }
        [GraphQLType(typeof(StringType))]
        public long? ExecutorId { get; set; }
        [GraphQLType(typeof(StringType))]
        public long CustomerId { get; set; }
        public int ProductId { get; set; }
        public OrderStatus Status { get; set; }

        public virtual User Customer { get; set; } = null!;
        public virtual User? Executor { get; set; }
        public virtual Product Product { get; set; } = null!;
        [GraphQLIgnore]
        public virtual ICollection<Orderchat> Orderchats { get; set; }
        [NotMapped]
        public virtual Orderchat? Orderchat { get; set; }

        public Orderchat? GetOrderchat([Parent] Order order, [Service] sandboxContext ctx)
        {
            return ctx.Orderchats.FirstOrDefault(o => o.OrderId == order.OrderId);
        }
    }
}
