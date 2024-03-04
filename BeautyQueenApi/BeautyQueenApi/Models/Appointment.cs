using System.ComponentModel.DataAnnotations;

namespace BeautyQueenApi.Models
{
    public class Appointment
    {
        [Key]
        public int Id { get; set; }
        public string Phone { get; set; } = null!;
        public TimeOnly StartAt { get; set; }
        public TimeOnly EndAt { get; set; }
        public int EmployeeId { get; set; }
        public int ScheduleId { get; set; }
        public int ServiceId { get; set; }

        public Employee Employee { get; set; } = null!;
        public Schedule Schedule { get; set; } = null!;
        public Service Service { get; set; } = null!;
    }
}
