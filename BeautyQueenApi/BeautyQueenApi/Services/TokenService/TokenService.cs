using BeautyQueenApi.Constants;
using BeautyQueenApi.Data;
using BeautyQueenApi.Models;
using BeautyQueenApi.Requests.Token;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;

namespace BeautyQueenApi.Services.TokenService
{
    public class TokenService : ITokenService
    {
        private readonly ApplicationDbContext _context;

        public TokenService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<TokenDto> Authenticate(TokenRequest request)
        {
            User? user = _context.User
                .Include(u => u.Roles)
                .FirstOrDefault(x => x.Login == request.Login);

            if (user == null)
            {
                throw new Exception("Неправильный логин или пароль");
            }

            if (!BCrypt.Net.BCrypt.Verify(request.Password, user.Password))
            {
                throw new Exception("Неправильный логин или пароль");
            }

            var refreshToken = CreateRefreshToken();

            user.RefreshToken = refreshToken;

            user.ExpiresIn = DateTime.UtcNow.AddDays(AuthOptions.REFRESH_TOKEN_LIFETIME);

            await _context.SaveChangesAsync();

            return new TokenDto {
                AccessToken = CreateAccessToken(user),
                RefreshToken = refreshToken
            };
        }

        public TokenDto RefreshToken(TokenDto tokenDto)
        {
            ClaimsPrincipal? principal = GetPrincipalFromToken(tokenDto.AccessToken);

            if (principal?.Identity?.Name == null)
            {
                throw new Exception("Невалидный access token");
            }

            User? admin = _context.User.FirstOrDefault(x => x.Login == principal.Identity.Name)
                ?? throw new Exception("Пользователь не найден");

            if (admin.RefreshToken != tokenDto.RefreshToken)
            {
                throw new Exception("Невалидный refresh token");
            }

            return new TokenDto
            {
                AccessToken = CreateAccessToken(admin),
                RefreshToken = admin.RefreshToken
            };
        }

        public string CreateAccessToken(User admin)
        {
            List<Claim> claims = new()
            {
                new Claim(ClaimTypes.Name, admin.Login),
            };

            var now = DateTime.UtcNow;
            var expires = now.AddDays(1).AddHours(-5);

            var jwt = new JwtSecurityToken(
                notBefore: now,
                claims: claims,
                expires: expires,
                signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256)
            );

            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }

        public string CreateRefreshToken()
        {
            var refreshToken = new byte[256];
            var rng = RandomNumberGenerator.Create();

            rng.GetBytes(refreshToken);

            return Convert.ToBase64String(refreshToken);
        }

        public ClaimsPrincipal? GetPrincipalFromToken(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = AuthOptions.ValidateAudience,
                ValidateIssuer = AuthOptions.ValidateIssuer,
                ValidateIssuerSigningKey = AuthOptions.ValidateIssuerSigningKey,
                IssuerSigningKey = AuthOptions.GetSymmetricSecurityKey(),
                ClockSkew = TimeSpan.Zero,
                ValidateLifetime = false
            };

            return tokenHandler.ValidateToken(token, tokenValidationParameters, out SecurityToken validatedToken);
        }
    }
}
