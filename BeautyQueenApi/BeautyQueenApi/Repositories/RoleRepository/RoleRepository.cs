using BeautyQueenApi.Data;
using BeautyQueenApi.Models;
using Microsoft.EntityFrameworkCore;

namespace BeautyQueenApi.Repositories.RoleRepository
{
    public class RoleRepository : IRoleRepository
    {
        private readonly ApplicationDbContext _context;

        public RoleRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Role>> Get()
        {
            return await _context.Role.ToListAsync();
        }
    }
}
