using BeautyQueenApi.Data;
using BeautyQueenApi.Services.StatisticService.Dtos;
using Microsoft.EntityFrameworkCore;

namespace BeautyQueenApi.Services.StatisticService
{
    public class StatisticService : IStatisticService
    {
        private readonly ApplicationDbContext _context;

        public StatisticService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<ResponseStatisticDto> GetRevenueStatistic(string? startDate, string? endDate, int? employeeId)
        {
            var apps = await _context.Appointment
                .Include(x => x.Schedule)
                .Include(x => x.Service)
                .ToListAsync();

            if (employeeId != null)
            {
                apps = apps.Where(x => x.EmployeeId == employeeId).ToList();
            }

            if (startDate != null)
            {
                var date = DateOnly.Parse(startDate);
                apps = apps.Where(x => x.Schedule.Date >= date).ToList();
            }

            if (endDate != null)
            {
                apps = apps.Where(x => x.Schedule.Date <= DateOnly.Parse(endDate)).ToList();
            }

            var statistics = apps
                .GroupBy(x => x.ScheduleId)
                .Select(x => new
                {
                    Label = x.Select(a => a.Schedule.Date).First(),
                    Value = x.Select(a => a.Service.Price).Sum()
                })
                .OrderBy(x => x.Label);

            return new ResponseStatisticDto
            {
                Labels = statistics.Select(x => x.Label.ToString()).ToList(),
                Values = statistics.Select(x => x.Value).ToList()
            };
        }

        public async Task<ResponseStatisticDto> GetUserStatistic(string? startDate, string? endDate, int? employeeId)
        {
            var apps = await _context.Appointment
                .Include(x => x.Schedule)
            .ToListAsync();

            if (employeeId != null)
            {
                apps = apps.Where(x => x.EmployeeId == employeeId).ToList();
            }

            if (startDate != null)
            {
                apps = apps.Where(x => x.Schedule.Date >= DateOnly.Parse(startDate)).ToList();
            }

            if (endDate != null)
            {
                apps = apps.Where(x => x.Schedule.Date <= DateOnly.Parse(endDate)).ToList();
            }

            var statistics = apps
                .GroupBy(x => x.ScheduleId)
                .Select(x => new
                {
                    Label = x.Select(a => a.Schedule.Date).First(),
                    Value = x.Select(a => a).Count()
                })
                .OrderBy(x => x.Label);

            return new ResponseStatisticDto
            {
                Labels = statistics.Select(x => x.Label.ToString()).ToList(),
                Values = statistics.Select(x => x.Value).ToList()
            };
        }
    }
}
