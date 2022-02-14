using System.ComponentModel.DataAnnotations.Schema;

using GPPlanetGQL.Discord;

using Sandbox.Types;

namespace Sandbox.Models
{
    public partial class User
    {
        public User()
        {
            Bills = new HashSet<Bill>();
            OrderCustomers = new HashSet<Order>();
            OrderExecutors = new HashSet<Order>();
            Ordermessages = new HashSet<Ordermessage>();
        }
        [GraphQLType(typeof(StringType))]
        public long DiscordId { get; set; }
        public int Money { get; set; }
        public int FrozenMoney { get; set; }
        public int Rating { get; set; }
        public UserStatus Status { get; set; }
        [NotMapped]
        public string Nickname { get; set; } = "";
        [NotMapped]
        public string Tag { get; set; } = "";
        [NotMapped]
        public string Avatar { get; set; } = "";


        [GraphQLIgnore]
        public virtual ICollection<Bill> Bills { get; set; }

        [GraphQLIgnore]
        public virtual ICollection<Order> OrderCustomers { get; set; }
        [GraphQLIgnore]
        public virtual ICollection<Order> OrderExecutors { get; set; }
        [GraphQLIgnore]
        public virtual ICollection<Ordermessage> Ordermessages { get; set; }

        public string GetNickname([Parent] User user, [Service] DiscordBot bot)
        {
            return bot.GetNicknameByDiscordId((ulong)user.DiscordId);
        }

        public string GetTag([Parent] User user, [Service] DiscordBot bot)
        {
            return bot.GetTagByDiscordId((ulong)user.DiscordId);
        }

        public string GetAvatar([Parent] User user, [Service] DiscordBot bot)
        {
            return bot.GetAvatarByDiscordId((ulong)user.DiscordId);
        }
    }
}
