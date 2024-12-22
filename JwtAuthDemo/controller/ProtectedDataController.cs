using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace JwtAuthDemo.Controllers
{
    [ApiController]
    [Route("api/protected")]
    public class ProtectedController : ControllerBase
    {
        [Authorize]
        [HttpGet("protected-endpoint")]
        public IActionResult GetProtectedData()
        {
            return Ok(new { message = "Protected data accessed successfully!" });
        }
    }
}
