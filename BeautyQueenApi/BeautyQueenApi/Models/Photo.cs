using System.ComponentModel.DataAnnotations;

namespace BeautyQueenApi.Models
{
    public class Photo
    {
        [Key]
        public int Id { get; set; }
        public int ServiceId { get; set; }
        public Service Service { get; set; }
        public int FileId { get; set; }
        public Image File { get; set; }
    }
}
