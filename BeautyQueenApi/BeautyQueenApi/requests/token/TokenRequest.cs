using BeautyQueenApi.Data;
using MediatR;

namespace BeautyQueenApi.Requests.Token
{
    public class TokenRequest : IRequest<TokenDto> {
        public string Login { get; set; } = null!;
        public string Password { get; set; } = null!;
    }
}