using BeautyQueenApi.Models;
using BeautyQueenApi.Repositories.UserRepository.Dtos;

namespace BeautyQueenApi.Repositories.UserRepository
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> Get(string? search, bool? onlyNotEmployees, int? excludedId);
        Task<User> GetById(int id);
        Task Update(int id, RequestUserDto user);
        Task Remove(int id);
    }
}
