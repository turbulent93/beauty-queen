using BeautyQueenApi.Models;
using BeautyQueenApi.Repositories.SpecializationRepository.Dtos;

namespace BeautyQueenApi.Repositories.SpecializationRepository
{
    public interface ISpecializationRepository
    {
        Task<IEnumerable<Specialization>> Get();
        Task<Specialization> GetById(int id);
        Task<Specialization> Add(SpecializationDto specializationDto);
        Task Update(int id, SpecializationDto specialization);
        Task Remove(int id);
    }
}
