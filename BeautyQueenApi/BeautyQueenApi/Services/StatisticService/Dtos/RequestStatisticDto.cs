namespace BeautyQueenApi.Services.StatisticService.Dtos
{
    public class RequestStatisticDto
    {
        public DateOnly? StartDate { get; set; }
        public DateOnly? EndDate { get; set; }
        public int? EmployeeId { get; set; }
    }
}
