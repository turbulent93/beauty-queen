using BeautyQueenApi.Models;
using BeautyQueenApi.Repositories.SpecializationRepository.Dtos;
using Mapster;

namespace BeautyQueenApi.Repositories.SpecializationRepository
{
    public class SpecializationMappingConfig : IRegister
    {
        public void Register(TypeAdapterConfig config)
        {
            config.NewConfig<SpecializationDto, Specialization>();
        }
    }
}
