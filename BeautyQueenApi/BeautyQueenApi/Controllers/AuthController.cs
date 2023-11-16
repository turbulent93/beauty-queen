using BeautyQueenApi.Repositories.AuthRepository;
using BeautyQueenApi.Repositories.AuthRepository.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace BeautyQueenApi.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _authRepository;

        public AuthController(IAuthRepository adminService)
        {
            _authRepository = adminService;
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register(RegisterDto adminDto)
        {

            try
            {
                await _authRepository.Register(adminDto);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost("check")]
        public async Task<ActionResult<CheckDto>> CheckAuth(TokensDto tokenDto)
        {
            try
            {
                var user = await _authRepository.CheckAuth(tokenDto);
                return Ok(user);
            }
            catch (Exception e)
            {
                return Unauthorized(e.Message);
            }
        }

        [HttpPost("login")]
        public async Task<ActionResult<TokensDto>> Login(LoginDto adminDto)
        {
            try
            {
                return Ok(await _authRepository.Login(adminDto));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost("refresh")]
        public ActionResult<TokensDto> RefreshToken(TokensDto loginDto)
        {
            try
            {
                return Ok(_authRepository.RefreshToken(loginDto));
            }
            catch (Exception e)
            {
                return Unauthorized(e.Message);
            }
        }
    }
}
