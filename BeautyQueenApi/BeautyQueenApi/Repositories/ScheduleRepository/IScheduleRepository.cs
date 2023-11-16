using BeautyQueenApi.Models;
using BeautyQueenApi.Repositories.ScheduleRepository.Dtos;

namespace BeautyQueenApi.Repositories.ScheduleRepository
{
    public interface IScheduleRepository
    {
        Task<IEnumerable<Schedule>> Get(int id, int? year, int? month);
        Task<Schedule> Add(ScheduleDto scheduleDto);
        Task Update(int id, ScheduleDto scheduleDto);
        Task Remove(int id);
        Task FillSchedule(FillScheduleDto dto);
        Task ClearSchedule(int employeeId);
    }
}
