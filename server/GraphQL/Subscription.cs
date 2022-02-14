using System.Security.Claims;

using HotChocolate.Execution;
using HotChocolate.Subscriptions;

using Sandbox.Exceptions;
using Sandbox.Models;

namespace Sandbox.GraphQL
{
    public class Subscription
    {
        [SubscribeAndResolve]
        public ValueTask<ISourceStream<Ordermessage>> UpdatedMessage(int chatId, [Service] sandboxContext ctx,
                [GlobalState(nameof(ClaimsPrincipal))] ClaimsPrincipal claimsPrincipal,
                [Service] ITopicEventReceiver receiver)
        {

            var discordId = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
            if (discordId == null) throw new IternalException("Вы не авторизованы");
            var u = ctx.Users.FirstOrDefault(u => u.DiscordId == long.Parse(discordId));
            if (u == null) throw new DoesNotExistsException("Аккаунт не найден");
            var topic = $"{chatId}_UpdatedChatMessage";
            return receiver.SubscribeAsync<string, Ordermessage>(topic);
        }
    }
}
