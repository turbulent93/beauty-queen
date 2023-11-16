using BeautyQueenApi.Models;
using BeautyQueenApi.Repositories.ScheduleRepository.Dtos;
using Mapster;

namespace BeautyQueenApi.Repositories.ScheduleRepository
{
    public class ScheduleMappingConfig : IRegister
    {
        public void Register(TypeAdapterConfig config)
        {
            config.NewConfig<ScheduleDto, Schedule>();
        }
    }
}
