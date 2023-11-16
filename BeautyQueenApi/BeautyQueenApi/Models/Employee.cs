using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace BeautyQueenApi.Models
{
    public class Employee
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        [JsonIgnore]
        public int SpecializationId { get; set; }
        [JsonIgnore]
        public Specialization Specialization { get; set; }
        public int? ImageId { get; set; }
        public Image Image { get; set; }
        [JsonIgnore]
        public List<Service> Services { get; set; }
        [JsonIgnore]
        public int UserId { get; set; }
        [JsonIgnore]
        public User User { get; set; }
    }
}
