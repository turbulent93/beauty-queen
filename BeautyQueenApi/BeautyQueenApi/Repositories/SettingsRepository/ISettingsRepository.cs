using BeautyQueenApi.Models;

namespace BeautyQueenApi.Repositories.SettingsRepository
{
    public interface ISettingsRepository
    {
        public Task<Settings> Get();
        public Task Update(Settings settings);
    }
}
