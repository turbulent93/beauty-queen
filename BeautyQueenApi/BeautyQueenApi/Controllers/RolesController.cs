using BeautyQueenApi.Models;
using BeautyQueenApi.Repositories.RoleRepository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BeautyQueenApi.Controllers
{
    [Route("api/roles")]
    [ApiController]
    public class RolesController : ControllerBase
    {
        private readonly IRoleRepository _roleRepository;

        public RolesController(IRoleRepository roleRepository)
        {
            _roleRepository = roleRepository;
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<Role>>> GetRole()
        {
            try
            {
                return Ok(await _roleRepository.Get());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
