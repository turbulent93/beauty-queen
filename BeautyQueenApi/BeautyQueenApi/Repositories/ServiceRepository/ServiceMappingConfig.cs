using BeautyQueenApi.Models;
using BeautyQueenApi.Repositories.ServiceRepository.Dtos;
using Mapster;

namespace BeautyQueenApi.Repositories.ServiceRepository
{
    public class ServiceMappingConfig : IRegister
    {
        public void Register(TypeAdapterConfig config)
        {
            config.NewConfig<ServiceDto, Service>();
        }
    }
}
