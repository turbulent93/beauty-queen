using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace BeautyQueenApi.Models
{
    public class Employee
    {
        [Key]
        public int Id { get; set; }
        public string FullName { get; set; } = null!;
        public int SpecializationId { get; set; }
        public int UserId { get; set; }

        public Specialization Specialization { get; set; } = null!;
        public User User { get; set; } = null!;
        public List<Service> Services { get; set; } = null!;
    }
}
