using BeautyQueenApi.Models;
using BeautyQueenApi.Repositories.EmployeeRepository.Dtos;
using Mapster;

namespace BeautyQueenApi.Repositories.EmployeeRepository
{
    public class EmployeeMappingConfig : IRegister
    {
        public void Register(TypeAdapterConfig config)
        {
            config.NewConfig<Employee, EmployeeWithUserDto>();

            config.NewConfig<EmployeeDto, Employee>();
            config.NewConfig<Employee, EmployeeWithIdsDto>()
                .Map(dest => dest.ServiceIds, src => src.Services.Select(service => service.Id));
        }
    }
}
