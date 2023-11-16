namespace BeautyQueenApi.Repositories.ScheduleRepository.Dtos
{
    public class ScheduleDto
    {
        public int? Id { get; set; }
        public DateOnly Date { get; set; }
        public int EmployeeId { get; set; }
        public TimeOnly StartAt { get; set; }
        public TimeOnly EndAt { get; set; }
    }
}
