using System;
using System.Collections.Generic;

namespace Sandbox.Models
{
    public partial class Bill
    {
        public int BillId { get; set; }
        public int Amount { get; set; }
        public string Status { get; set; } = null!;
        public long UserId { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? CompletedAt { get; set; }

        public virtual User User { get; set; } = null!;
    }
}
