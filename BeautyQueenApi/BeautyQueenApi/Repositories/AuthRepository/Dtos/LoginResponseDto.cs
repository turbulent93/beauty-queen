using BeautyQueenApi.Models;
using BeautyQueenApi.Repositories.EmployeeRepository.Dtos;

namespace BeautyQueenApi.Repositories.AuthRepository.Dtos
{
    public class LoginResponseDto
    {
        public User User { get; set; }
        public EmployeeWithIdsDto? Employee { get; set; }
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }
    }
}
