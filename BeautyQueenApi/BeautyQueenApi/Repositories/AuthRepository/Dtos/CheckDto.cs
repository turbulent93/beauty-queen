using BeautyQueenApi.Models;
using BeautyQueenApi.Repositories.EmployeeRepository.Dtos;

namespace BeautyQueenApi.Repositories.AuthRepository.Dtos
{
    public class CheckDto
    {
        public User User { get; set; }
        public EmployeeWithIdsDto? Employee { get; set; }
    }
}
