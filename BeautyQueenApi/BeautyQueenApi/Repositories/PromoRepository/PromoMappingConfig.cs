using BeautyQueenApi.Models;
using BeautyQueenApi.Repositories.PromoRepository.Dtos;
using Mapster;

namespace BeautyQueenApi.Repositories.PromoRepository
{
    public class PromoMappingConfig : IRegister
    {
        public void Register(TypeAdapterConfig config)
        {
            config.NewConfig<PromoDto, Promotion>();
        }
    }
}
