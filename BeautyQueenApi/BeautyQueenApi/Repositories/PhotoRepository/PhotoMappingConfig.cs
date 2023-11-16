using BeautyQueenApi.Models;
using BeautyQueenApi.Repositories.PhotoRepository.Dtos;
using Mapster;

namespace BeautyQueenApi.Repositories.PhotoRepository
{
    public class PhotoMappingConfig : IRegister
    {
        public void Register(TypeAdapterConfig config)
        {
            config.NewConfig<PhotoDto, Photo>();
        }
    }
}
