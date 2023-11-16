using BeautyQueenApi.Data;
using BeautyQueenApi.Models;
using Microsoft.EntityFrameworkCore;

namespace BeautyQueenApi.Repositories.SettingsRepository
{
    public class SettingsRepository : ISettingsRepository
    {
        private readonly ApplicationDbContext _context;
        public SettingsRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Settings> Get()
        {
            var settings = await _context.Settings.FirstOrDefaultAsync(s => s.Id == 1);

            if (settings == null)
            {
                throw new Exception("Settings is null");
            }

            return settings;
        }

        public async Task Update(Settings settings)
        {
            if (settings.Id != 1)
            {
                throw new Exception("Settings Id is incorrect");
            }

            _context.Entry(settings).State = EntityState.Modified;

            await _context.SaveChangesAsync();
        }
    }
}
