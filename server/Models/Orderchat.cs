using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Sandbox.Models
{
    public partial class Orderchat
    {
        public Orderchat()
        {
            Ordermessages = new HashSet<Ordermessage>();
        }

        public int OrderchatId { get; set; }
        public int OrderId { get; set; }
        public DateTime CreatedAt { get; set; }

        public virtual Order Order { get; set; } = null!;
        [GraphQLIgnore]
        public virtual ICollection<Ordermessage> Ordermessages { get; set; }
        [NotMapped]
        public virtual Ordermessage? Lastmessage { get; set; }

        public Ordermessage? GetLastmessage([Parent] Orderchat chat, [Service] sandboxContext ctx)
        {
            return ctx.Ordermessages.Where(u => u.OrderchatId == chat.OrderchatId).OrderByDescending(m => m.CreatedAt).FirstOrDefault();
        }
    }
}
