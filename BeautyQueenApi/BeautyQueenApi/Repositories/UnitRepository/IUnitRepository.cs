using BeautyQueenApi.Models;

namespace BeautyQueenApi.Repositories.UnitRepository
{
    public interface IUnitRepository
    {
        Task<IEnumerable<Unit>> Get();
    }
}
