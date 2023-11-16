namespace BeautyQueenApi.Repositories.AppointmentRepository.Dtos
{
    public class RequestAppointmentDto
    {
        public int EmployeeId { get; set; }
        public int ScheduleId { get; set; }
        public int ServiceId { get; set; }
        public int PromoId { get; set; }
        public TimeOnly StartAt { get; set; }
        public TimeOnly EndAt { get; set; }
        public string Phone { get; set; }
    }
}
