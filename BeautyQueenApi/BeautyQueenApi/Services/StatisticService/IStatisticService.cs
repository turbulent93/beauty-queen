using BeautyQueenApi.Services.StatisticService.Dtos;

namespace BeautyQueenApi.Services.StatisticService
{
    public interface IStatisticService
    {
        Task<ResponseStatisticDto> GetRevenueStatistic(string? startDate, string? endDate, int? employeeId);
        Task<ResponseStatisticDto> GetUserStatistic(string? startDate, string? endDate, int? employeeId);
    }
}
