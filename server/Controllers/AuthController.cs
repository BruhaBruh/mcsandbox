using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Sandbox.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {

        public AuthController()
        {
        }

        [HttpGet("login")]
        [Authorize(AuthenticationSchemes = "Discord")]
        public async Task<IActionResult> Login()
        {
            return Redirect(Url.Content("~/"));
        }

        [HttpGet("logout")]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync();
            return Redirect(Url.Content("~/"));
        }

    }
}
