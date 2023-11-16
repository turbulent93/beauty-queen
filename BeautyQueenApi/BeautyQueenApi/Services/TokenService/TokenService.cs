using BeautyQueenApi.Constants;
using BeautyQueenApi.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;

namespace BeautyQueenApi.Services.TokenService
{
    public class TokenService : ITokenService
    {
        public string CreateAccessToken(User admin)
        {
            List<Claim> claims = new()
            {
                new Claim(ClaimTypes.Name, admin.Login),
                new Claim(ClaimTypes.Role, admin.Role.Name)
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
