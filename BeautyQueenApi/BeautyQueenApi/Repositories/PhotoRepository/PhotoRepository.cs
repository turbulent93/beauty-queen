using BeautyQueenApi.Data;
using BeautyQueenApi.Models;
using BeautyQueenApi.Repositories.PhotoRepository.Dtos;
using MapsterMapper;
using Microsoft.EntityFrameworkCore;

namespace BeautyQueenApi.Repositories.PhotoRepository
{
    public class PhotoRepository : IPhotoRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public PhotoRepository(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<Photo> Add(PhotoDto photoDto)
        {
            var photo = _mapper.Map<Photo>(photoDto);

            _context.Photo.Add(photo);

            await _context.SaveChangesAsync();

            return photo;
        }

        public async Task<IEnumerable<Photo>> Get(int? serviceId)
        {
            var photos = await _context.Photo.ToListAsync();

            if (serviceId != null)
            {
                photos = photos.Where(photo => photo.ServiceId == serviceId).ToList();
            }

            return photos;
        }

        public async Task Remove(int id)
        {
            var photo = await _context.Photo.FindAsync(id);

            if (photo == null)
            {
                throw new Exception("Photo is not found");
            }

            _context.Photo.Remove(photo);

            await _context.SaveChangesAsync();
        }

        public async Task Update(int id, Photo photo)
        {
            if (id != photo.Id)
            {
                throw new Exception("Photo id is not equal to id");
            }

            _context.Entry(photo).State = EntityState.Modified;

            await _context.SaveChangesAsync();
        }
    }
}
