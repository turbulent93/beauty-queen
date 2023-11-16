using BeautyQueenApi.Models;
using BeautyQueenApi.Repositories.PhotoRepository.Dtos;

namespace BeautyQueenApi.Repositories.PhotoRepository
{
    public interface IPhotoRepository
    {
        Task<IEnumerable<Photo>> Get(int? serviceId);
        Task<Photo> Add(PhotoDto photo);
        Task Update(int id, Photo photo);
        Task Remove(int id);
    }
}
