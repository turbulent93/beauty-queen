using BeautyQueenApi.Data;
using BeautyQueenApi.Models;
using Microsoft.EntityFrameworkCore;

namespace BeautyQueenApi.Repositories.MetaRepository
{
    public class MetaRepository : IMetaRepository
    {
        private readonly ApplicationDbContext _context;

        public MetaRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Meta> Get()
        {
            var meta = await _context.Meta.FirstOrDefaultAsync(m => m.Id == 1);

            if (meta == null)
            {
                throw new Exception("Meta is null");
            }

            return meta;
        }

        public async Task Update(Meta meta)
        {
            if (meta.Id != 1)
            {
                throw new Exception("Settings Id is incorrect");
            }

            _context.Entry(meta).State = EntityState.Modified;

            await _context.SaveChangesAsync();
        }
    }
}
