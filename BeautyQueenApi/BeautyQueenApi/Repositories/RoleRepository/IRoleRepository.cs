using BeautyQueenApi.Models;

namespace BeautyQueenApi.Repositories.RoleRepository
{
    public interface IRoleRepository
    {
        Task<IEnumerable<Role>> Get();
    }
}
