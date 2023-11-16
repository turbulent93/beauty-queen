using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace BeautyQueenApi.Models
{
    public class Image
    {
        [Key]
        public int Id { get; set; }
        public string Source { get; set; }
        public int UserId { get; set; }
        public string Status { get; set; }

        [JsonIgnore]
        public User User { get; set; }
        [JsonIgnore]
        public Photo Photo { get; set; }
        [JsonIgnore]
        public Promotion Promo { get; set; }
        [JsonIgnore]
        public Employee Employee { get; set; }
        [JsonIgnore]
        public Settings MainPhoto { get; set; }
        [JsonIgnore]
        public Settings Favicon { get; set; }
    }
}
