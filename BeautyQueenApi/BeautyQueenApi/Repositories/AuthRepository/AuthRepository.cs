using BeautyQueenApi.Constants;
using BeautyQueenApi.Data;
using BeautyQueenApi.Models;
using BeautyQueenApi.Repositories.AuthRepository.Dtos;
using BeautyQueenApi.Repositories.EmployeeRepository.Dtos;
using BeautyQueenApi.Services.TokenService;
using MapsterMapper;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace BeautyQueenApi.Repositories.AuthRepository
{
    public class AuthRepository : IAuthRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;

        public AuthRepository(ApplicationDbContext context, ITokenService tokenService, IMapper mapper)
        {
            _context = context;
            _tokenService = tokenService;
            _mapper = mapper;
        }

        public async Task<LoginResponseDto> Login(LoginDto adminDto)
        {
            User? user = _context.User
                .FirstOrDefault(x => x.Login == adminDto.Login);

            if (user == null)
            {
                throw new Exception("Invalid login or password");
            }

            _context.Entry(user).Reference(x => x.Role).Load();

            var responseDto = new LoginResponseDto();

            var employee = _context.Employee.FirstOrDefault(x => x.UserId == user.Id);

            if (employee != null)
            {
                _context.Entry(employee).Reference(x => x.Specialization).Load();
                _context.Entry(employee).Collection(x => x.Services).Load();

                responseDto.Employee = _mapper.Map<EmployeeWithIdsDto>(employee);
            }

            if (!BCrypt.Net.BCrypt.Verify(adminDto.Password, user.Password))
            {
                throw new Exception("Invalid login or password");
            }

            responseDto.RefreshToken = _tokenService.CreateRefreshToken();

            user.RefreshToken = responseDto.RefreshToken;

            user.ExpiresIn = DateTime.UtcNow.AddDays(AuthOptions.REFRESH_TOKEN_LIFETIME);

            await _context.SaveChangesAsync();

            responseDto.User = user;

            responseDto.AccessToken = _tokenService.CreateAccessToken(user);

            return responseDto;
        }

        public async Task Register(RegisterDto adminDto)
        {
            if (adminDto.SecretKey != AuthOptions.REGISTER_KEY)
            {
                throw new Exception("Invalid key");
            }

            if (_context.User.Any(x => x.Login == adminDto.Login))
            {
                throw new Exception("Admin is already exists");
            }

            var admin = new User
            {
                Login = adminDto.Login,
                Password = BCrypt.Net.BCrypt.HashPassword(adminDto.Password),
                RoleId = adminDto.RoleId
            };

            _context.User.Add(admin);

            await _context.SaveChangesAsync();
        }

        public TokensDto RefreshToken(TokensDto loginDto)
        {
            ClaimsPrincipal? principal = _tokenService.GetPrincipalFromToken(loginDto.AccessToken);

            if (principal?.Identity?.Name == null)
            {
                throw new Exception("Invalid token");
            }

            User? admin = _context.User.FirstOrDefault(x => x.Login == principal.Identity.Name);

            if (admin == null)
            {
                throw new Exception("User is not found");
            }

            _context.Entry(admin).Reference(x => x.Role).Load();

            if (admin.RefreshToken != loginDto.RefreshToken)
            {
                throw new Exception("Invalid refresh token");
            }

            //if(DateTime.Now < admin.ExpiresIn)
            //{
            //    throw new Exception("Token has not expired yet");
            //}

            return new TokensDto
            {
                AccessToken = _tokenService.CreateAccessToken(admin),
                RefreshToken = admin.RefreshToken
            };
        }

        public async Task<CheckDto> CheckAuth(TokensDto dto)
        {
            ClaimsPrincipal? principal = _tokenService.GetPrincipalFromToken(dto.AccessToken);

            if (principal?.Identity?.Name == null)
            {
                throw new Exception("Invalid token");
            }

            User? user = await _context.User.FirstOrDefaultAsync(user => user.Login == principal.Identity.Name);

            if (user == null)
            {
                throw new Exception("Admin is not found");
            }

            _context.Entry(user).Reference(x => x.Role).Load();

            var checkDto = new CheckDto();

            var employee = _context.Employee.FirstOrDefault(x => x.UserId == user.Id);

            if (employee != null)
            {
                _context.Entry(employee).Reference(x => x.Specialization).Load();
                _context.Entry(employee).Collection(x => x.Services).Load();

                checkDto.Employee = _mapper.Map<EmployeeWithIdsDto>(employee);
            }

            if (user.RefreshToken != dto.RefreshToken)
            {
                throw new Exception("Invalid refresh token");
            }

            checkDto.User = user;

            return checkDto;
        }
    }
}
