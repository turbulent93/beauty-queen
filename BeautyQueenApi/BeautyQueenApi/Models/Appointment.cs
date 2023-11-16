using System.ComponentModel.DataAnnotations;

namespace BeautyQueenApi.Models
{
    public class Appointment
    {
        [Key]
        public int Id { get; set; }
        public int EmployeeId { get; set; }
        public Employee Employee { get; set; }
        public int ScheduleId { get; set; }
        public Schedule Schedule { get; set; }
        public int ServiceId { get; set; }
        public Service Service { get; set; }
        public int? PromotionId { get; set; }
        public Promotion? Promotion { get; set; }
        public TimeOnly StartAt { get; set; }
        public TimeOnly EndAt { get; set; }
        public string Phone { get; set; }
    }
}
