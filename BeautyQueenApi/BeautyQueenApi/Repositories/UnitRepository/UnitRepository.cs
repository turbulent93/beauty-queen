using BeautyQueenApi.Data;
using BeautyQueenApi.Models;
using Microsoft.EntityFrameworkCore;

namespace BeautyQueenApi.Repositories.UnitRepository
{
    public class UnitRepository : IUnitRepository
    {
        private readonly ApplicationDbContext _context;

        public UnitRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Unit>> Get()
        {
            return await _context.Unit.ToListAsync();
        }
    }
}
