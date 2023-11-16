using BeautyQueenApi.Models;

namespace BeautyQueenApi.Repositories.MetaRepository
{
    public interface IMetaRepository
    {
        public Task<Meta> Get();
        public Task Update(Meta settings);
    }
}
