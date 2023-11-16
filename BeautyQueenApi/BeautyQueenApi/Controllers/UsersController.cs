using BeautyQueenApi.Constants;
using BeautyQueenApi.Models;
using BeautyQueenApi.Repositories.UserRepository;
using BeautyQueenApi.Repositories.UserRepository.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BeautyQueenApi.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        public UsersController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet]
        [Authorize(Roles = RoleOptions.ADMIN_ROLE_NAME)]
        public async Task<ActionResult<IEnumerable<User>>> Get(string? search, bool? onlyNotEmployees, int? excludedId)
        {
            try
            {
                return Ok(await _userRepository.Get(search, onlyNotEmployees, excludedId));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("{id}")]
        [Authorize(Roles = RoleOptions.ADMIN_ROLE_NAME)]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            try
            {
                return Ok(await _userRepository.GetById(id));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut("{id}")]
        [Authorize(Roles = RoleOptions.ADMIN_ROLE_NAME)]
        public async Task<IActionResult> PutUser(int id, RequestUserDto user)
        {
            try
            {
                await _userRepository.Update(id, user);

                return NoContent();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = RoleOptions.ADMIN_ROLE_NAME)]
        public async Task<IActionResult> DeleteUser(int id)
        {
            try
            {
                await _userRepository.Remove(id);
                return NoContent();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}

