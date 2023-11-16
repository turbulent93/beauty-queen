using System.ComponentModel.DataAnnotations;

namespace BeautyQueenApi.Models
{
    public class Settings
    {
        [Key]
        public int Id { get; set; }
        public int? MainPhotoId { get; set; }
        public Image? MainPhoto { get; set; }
        public string? MainTitle { get; set; }
        public string? MainDescription { get; set; }
        public int? FaviconId { get; set; }
        public Image? Favicon { get; set; }
        public string? Phone { get; set; }
        public string? Vk { get; set; }
        public string? Mail { get; set; }
        public string? Address { get; set; }
        public TimeOnly DefaultStartWorkTime { get; set; }
        public TimeOnly DefaultEndWorkTime { get; set; }
    }
}
