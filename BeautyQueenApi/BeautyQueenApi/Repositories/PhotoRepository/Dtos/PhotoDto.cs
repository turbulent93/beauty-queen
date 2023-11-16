using BeautyQueenApi.Models;

namespace BeautyQueenApi.Repositories.PhotoRepository.Dtos
{
    public class PhotoDto
    {
        public string Title { get; set; }
        public int ServiceId { get; set; }
        public int FileId { get; set; }
        public Image File { get; set; }
    }
}
