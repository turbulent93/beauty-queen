using BeautyQueenApi.Repositories.AuthRepository.Dtos;

namespace BeautyQueenApi.Repositories.AuthRepository
{
    public interface IAuthRepository
    {
        public Task<LoginResponseDto> Login(LoginDto adminDto);
        public Task Register(RegisterDto adminDto);
        public TokensDto RefreshToken(TokensDto loginDto);
        public Task<CheckDto> CheckAuth(TokensDto dto);
    }
}
