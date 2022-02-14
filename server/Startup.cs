using Microsoft.EntityFrameworkCore;
using GraphQL.Server.Ui.Voyager;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.CookiePolicy;
using Sandbox.Models;
using Sandbox.GraphQL;
using GPPlanetGQL.Discord;
using Sandbox.Services;

namespace Sandbox
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {

            services.AddLogging(loggingBuilder =>
            {
                loggingBuilder
                    .SetMinimumLevel(LogLevel.Warning)
                    .AddSimpleConsole()
                    .AddDebug()
                    .AddFilter(DbLoggerCategory.Database.Command.Name, LogLevel.Information);
            });

            var pgConStr = Environment.GetEnvironmentVariable("PGConStr");
            services.AddDbContext<sandboxContext>(opt =>
                opt.UseNpgsql(pgConStr ?? ""));

            services
                .AddAuthentication(options =>
                {
                    options.DefaultChallengeScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                    options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                    options.DefaultSignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                })
                .AddCookie(options =>
                {
                    options.LoginPath = "/api/auth/login";
                    options.LogoutPath = "/api/auth/logout";
                    options.Events.OnSigningIn = (ctx) =>
                    {
                        ctx.CookieOptions.Expires = DateTimeOffset.UtcNow.AddDays(30);
                        return Task.CompletedTask;
                    };
                })
                .AddDiscord(options =>
                {
                    var clientId = Environment.GetEnvironmentVariable("DiscordClientId");
                    var clientSecret = Environment.GetEnvironmentVariable("DiscordClientSecret");
                    if (clientId == null || clientId == null) return;
                    options.ClientId = clientId ?? "";
                    options.ClientSecret = clientSecret ?? "";
                    options.CallbackPath = new PathString("/api/auth/callback");
                    options.ClaimActions.MapJsonKey(ClaimTypes.NameIdentifier, "id");
                });

            services.AddAuthorization();

            services.AddControllers();

            services.AddSingleton<DiscordBot>();
            services.AddSingleton<ImgBBService>();

            services.AddInMemorySubscriptions();

            services
                .AddGraphQLServer()
                .AddAuthorization()
                .AddQueryType<Query>()
                .AddMutationType<Mutation>()
                .AddSubscriptionType<Subscription>()
                .AddDefaultTransactionScopeHandler()
                .AddProjections()
                .AddFiltering()
                .AddSorting()
                .AddErrorFilter<ErrorFilter>();

        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            var cookiePolicyOptions = new CookiePolicyOptions
            {
                MinimumSameSitePolicy = SameSiteMode.Lax,
                HttpOnly = HttpOnlyPolicy.Always,
                Secure = CookieSecurePolicy.None,
            };

            app.UseCookiePolicy(cookiePolicyOptions);

            app.UseRouting();

            app.UseWebSockets();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapGet("/", ctx =>
                {
                    ctx.Response.Redirect("graphql");
                    return Task.CompletedTask;
                });
                endpoints.MapControllers();
                endpoints.MapGraphQL("/graphql");
            });



            app.UseGraphQLVoyager(new VoyagerOptions()
            {
                GraphQLEndPoint = "/graphql",
            }, "/graphql-voyager");

            _ = app.ApplicationServices.GetService<DiscordBot>().GetUsersInGuild();
        }
    }
}
