using System.ComponentModel.DataAnnotations;

namespace BeautyQueenApi.Models
{
    public class Meta
    {
        [Key]
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
    }
}
