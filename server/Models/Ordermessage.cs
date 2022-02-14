using System;
using System.Collections.Generic;

namespace Sandbox.Models
{
    public partial class Ordermessage
    {
        public Ordermessage()
        {
            InverseReplyMessage = new HashSet<Ordermessage>();
        }

        public int OrdermessageId { get; set; }
        public int OrderchatId { get; set; }
        [GraphQLType(typeof(StringType))]
        public long OwnerId { get; set; }
        public int? ReplyMessageId { get; set; }
        [GraphQLType(typeof(string[]))]
        public long[] ReadedUserIds { get; set; } = null!;
        public string Message { get; set; } = null!;
        public string[] Attachments { get; set; } = null!;
        public DateTime CreatedAt { get; set; }

        [GraphQLIgnore]
        public virtual Orderchat Orderchat { get; set; } = null!;
        public virtual User Owner { get; set; } = null!;
        public virtual Ordermessage? ReplyMessage { get; set; }
        [GraphQLIgnore]
        public virtual ICollection<Ordermessage> InverseReplyMessage { get; set; }
    }
}
