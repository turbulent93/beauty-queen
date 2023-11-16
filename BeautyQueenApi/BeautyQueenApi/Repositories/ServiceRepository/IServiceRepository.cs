using BeautyQueenApi.Repositories.ServiceRepository.Dtos;

namespace BeautyQueenApi.Repositories.ServiceRepository
{
    public interface IServiceRepository
    {
        Task<IEnumerable<ServiceDto>> Get(string? search, int? promoId, int? employeeId);
        Task<ServiceDto> GetById(int id);
        Task Update(int id, ServiceDto serviceDto);
        Task<ServiceDto> Add(ServiceDto serviceDto);
        Task Remove(int id);
    }
}
