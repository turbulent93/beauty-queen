using BeautyQueenApi.Models;
using System.Security.Claims;

namespace BeautyQueenApi.Services.TokenService
{
    public interface ITokenService
    {
        public string CreateAccessToken(User admin);
        public string CreateRefreshToken();
        public ClaimsPrincipal? GetPrincipalFromToken(string token);
    }
}
