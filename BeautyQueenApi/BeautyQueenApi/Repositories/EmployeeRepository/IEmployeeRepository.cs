using BeautyQueenApi.Models;
using BeautyQueenApi.Repositories.EmployeeRepository.Dtos;

namespace BeautyQueenApi.Repositories.EmployeeRepository
{
    public interface IEmployeeRepository
    {
        Task<IEnumerable<Employee>> Get(string? search, int? serviceId);
        Task<IEnumerable<Employee>> GetWithUser();
        Task<EmployeeWithIdsDto> GetById(int id);
        Task<Employee> Add(EmployeeDto employeeDto);
        Task Update(int id, EmployeeDto employeeDto);
        Task Remove(int id);
    }
}
