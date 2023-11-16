using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace BeautyQueenApi.Models
{
    public class Promotion
    {
        [Key]
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int ImageId { get; set; }
        public Image Image { get; set; }
        public int Discount { get; set; }
        [JsonIgnore]
        public int UnitId { get; set; }
        public Unit Unit { get; set; }
        public List<Service> Services { get; set; }
        public DateOnly? PeriodFrom { get; set; }
        public DateOnly? PeriodTo { get; set; }
    }
}
