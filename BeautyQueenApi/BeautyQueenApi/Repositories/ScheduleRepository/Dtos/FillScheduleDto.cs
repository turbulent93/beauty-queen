namespace BeautyQueenApi.Repositories.ScheduleRepository.Dtos
{
    public class FillScheduleDto
    {
        public int EmployeeId { get; set; }
        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }
        public bool? OnlyWorkDays { get; set; }
        public bool? OnlyWeekendDays { get; set; }
        public int WorkDays { get; set; } = 2;
        public int WeekendDays { get; set; } = 2;
        public TimeOnly StartAt { get; set; }
        public TimeOnly EndAt { get; set; }
    }
}
