
using Discord;
using Discord.WebSocket;

using Sandbox.Exceptions;

namespace GPPlanetGQL.Discord
{
    public class DiscordBot
    {
        private readonly ILogger<DiscordBot> _logger;
        private readonly DiscordSocketClient _client;
        private readonly ulong _guildid;
        private readonly string _token;
        private readonly long[] _blacklistedRoles;

        public DiscordBot(ILogger<DiscordBot> logger)
        {
            _guildid = 864891850086023189;
            _blacklistedRoles = new long[] {
            };
            _logger = logger;
            _token = Environment.GetEnvironmentVariable("DiscordBotToken") ?? "";
            var discordConfig = new DiscordSocketConfig
            {
                AlwaysDownloadUsers = true,
                GatewayIntents = GatewayIntents.Guilds | GatewayIntents.GuildMembers
            };
            _client = new DiscordSocketClient();

            _client.Log += Log;
            _client.LoginAsync(TokenType.Bot, _token).GetAwaiter().GetResult();
            _client.StartAsync().GetAwaiter().GetResult();
        }

        private Task Log(LogMessage msg)
        {
            _logger.LogInformation(msg.ToString());
            return Task.CompletedTask;
        }

        private SocketGuild? GetGuild()
        {
            var g = _client.GetGuild(_guildid);
            if (g != null) return g;
            return null;
        }

        private SocketGuildUser? GetGuildMember(ulong discordId)
        {
            var g = GetGuild();
            if (g == null) return null;
            var u = g.Users.Where(u => !u.IsBot && u.Id == discordId).FirstOrDefault();
            if (u != null) return u;
            return null;
        }

        private SocketUser? GetUser(ulong discordId)
        {
            var du = _client.GetUser(discordId);
            if (du != null) return du;
            du = _client.GetUser(discordId);
            return du;
        }

        public ulong[] GetUsersInGuild()
        {
            var g = GetGuild();
            if (g == null) return Array.Empty<ulong>();
            var users = g.Users;
            if (users == null) return Array.Empty<ulong>();
            var userIds = users
                .Where(m => !m.IsBot)
                .Select(m => m.Id)
                .ToArray();
            if (userIds == null) return Array.Empty<ulong>();
            return userIds;
        }

        public async Task<ulong[]> SearchUsersInGuild(string search)
        {
            if (search == "") return GetUsersInGuild();
            var g = GetGuild();
            var users = await g.SearchUsersAsync(search);
            var userIds = users
                .Where(m => !m.IsBot)
                .Select(m => m.Id)
                .ToArray();
            if (userIds == null) return Array.Empty<ulong>();
            return userIds;
        }

        public string GetNicknameByDiscordId(ulong discordId)
        {
            var u = GetGuildMember(discordId);
            if (u != null) return u.Nickname ?? u.Username;
            var du = GetUser(discordId);
            if (du == null) return "";
            return du.Username;
        }

        public string GetTagByDiscordId(ulong discordId)
        {
            var u = GetGuildMember(discordId);
            if (u != null) return $"{u.Username}#{u.Discriminator}";
            var du = GetUser(discordId);
            if (du == null) return "";
            return $"{du.Username}#{du.Discriminator}";

        }

        public string GetAvatarByDiscordId(ulong discordId)
        {
            var u = GetGuildMember(discordId);
            if (u != null) return u.GetAvatarUrl(ImageFormat.Auto, 256) ?? "";
            var du = GetUser(discordId);
            if (du == null) return "";
            return du.GetAvatarUrl(ImageFormat.Auto, 256) ?? "";
        }
    }
}
