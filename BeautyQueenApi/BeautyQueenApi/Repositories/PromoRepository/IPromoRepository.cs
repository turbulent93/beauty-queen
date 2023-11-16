using BeautyQueenApi.Models;
using BeautyQueenApi.Repositories.PromoRepository.Dtos;

namespace BeautyQueenApi.Repositories.PromotionsRepository
{
    public interface IPromoRepository
    {
        Task<IEnumerable<Promotion>> Get();
        Task<Promotion> GetById(int id);
        Task Update(int id, PromoDto promoDto);
        Task<Promotion> Add(PromoDto promoDto);
        Task Remove(int id);
    }
}
