using BeautyQueenApi.Data;
using BeautyQueenApi.Models;
using BeautyQueenApi.Repositories.ScheduleRepository.Dtos;
using MapsterMapper;
using Microsoft.EntityFrameworkCore;

namespace BeautyQueenApi.Repositories.ScheduleRepository
{
    public class ScheduleRepository : IScheduleRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        public ScheduleRepository(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<Schedule>> Get(int employeeId, int? year, int? month)
        {
            var schedules = await _context.Schedule.ToListAsync();

            if (year != null && month != null)
            {
                schedules = schedules.Where(x => x.EmployeeId == employeeId && x.Date.Year == year && x.Date.Month == month).ToList();
            }
            else
            {
                var curDate = DateOnly.FromDateTime(DateTime.Today);
                var date = DateOnly.FromDateTime(DateTime.Today.AddDays(10));

                schedules = schedules
                    .OrderBy(x => x.Date)
                    .Where(x => x.EmployeeId == employeeId &&
                        x.Date >= curDate && x.Date <= date).ToList();
            }

            return schedules;
        }
        public async Task<Schedule> Add(ScheduleDto scheduleDto)
        {
            Schedule schedule = _mapper.Map<Schedule>(scheduleDto);

            _context.Schedule.Add(schedule);

            await _context.SaveChangesAsync();

            if (!ServiceExists(schedule.Id))
            {
                throw new Exception("Service does not add");
            }

            return schedule;
        }

        public async Task Remove(int id)
        {
            Schedule? schedule = await _context.Schedule.FindAsync(id);

            if (schedule == null)
            {
                throw new Exception("Schedule is not found");
            }

            if (await CheckIsAppointed(id))
            {
                throw new Exception("Schedule contains appointments");
            }

            _context.Schedule.Remove(schedule);

            await _context.SaveChangesAsync();
        }

        private async Task<bool> CheckIsAppointed(int scheduleId)
        {
            return await _context.Appointment.FirstOrDefaultAsync(x => x.ScheduleId == scheduleId) != null;
        }

        public bool ServiceExists(int id)
        {
            return (_context.Schedule?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        public async Task FillSchedule(FillScheduleDto dto)
        {
            if (dto.OnlyWorkDays != null && dto.OnlyWorkDays == true)
            {
                FillOnlyWorkDaysSchedule(dto);
            }
            else if (dto.OnlyWeekendDays != null && dto.OnlyWeekendDays == true)
            {
                await FillOnlyWeekendDaysSchedule(dto);
            }
            else
            {
                await FillScheduleByDays(dto);
            }

            await _context.SaveChangesAsync();
        }

        private async Task FillOnlyWeekendDaysSchedule(FillScheduleDto dto)
        {
            for (int i = dto.StartDate.Day; i <= dto.EndDate.Day; i++)
            {
                var curDate = new DateOnly(dto.StartDate.Year, dto.StartDate.Month, i);
                var curSchedule = _context.Schedule.FirstOrDefault(x => x.EmployeeId == dto.EmployeeId && x.Date == curDate);

                if (curSchedule != null && !await CheckIsAppointed(curSchedule.Id))
                {
                    _context.Schedule.Remove(curSchedule);
                }

            }
        }

        private void FillOnlyWorkDaysSchedule(FillScheduleDto dto)
        {
            for (int i = dto.StartDate.Day; i <= dto.EndDate.Day; i++)
            {
                var curDate = new DateOnly(dto.StartDate.Year, dto.StartDate.Month, i);
                var curSchedule = _context.Schedule.FirstOrDefault(x => x.EmployeeId == dto.EmployeeId && x.Date == curDate);

                if (curSchedule == null)
                {
                    _context.Schedule.Add(new Schedule
                    {
                        EmployeeId = dto.EmployeeId,
                        Date = curDate,
                        StartAt = dto.StartAt,
                        EndAt = dto.EndAt
                    });
                }
            }
        }

        private async Task FillScheduleByDays(FillScheduleDto dto)
        {
            var workDaysCount = 1;
            var weekendDaysCount = 0;
            var isWorkDay = true;

            for (int i = dto.StartDate.Day; i <= dto.EndDate.Day; i++)
            {
                var curDate = new DateOnly(dto.StartDate.Year, dto.StartDate.Month, i);
                var curSchedule = _context.Schedule.FirstOrDefault(x => x.EmployeeId == dto.EmployeeId && x.Date == curDate);

                if (isWorkDay == true)
                {
                    if (curSchedule == null)
                    {
                        _context.Schedule.Add(new Schedule
                        {
                            EmployeeId = dto.EmployeeId,
                            Date = curDate,
                            StartAt = dto.StartAt,
                            EndAt = dto.EndAt
                        });
                    }
                    if (workDaysCount == dto.WorkDays)
                    {
                        workDaysCount = 0;
                        weekendDaysCount = 1;
                        isWorkDay = false;
                    }
                    else
                    {
                        workDaysCount++;
                    }
                }
                else
                {
                    if (curSchedule != null)
                    {
                        if (!await CheckIsAppointed(curSchedule.Id))
                        {
                            _context.Schedule.Remove(curSchedule);
                        }
                    }
                    if (weekendDaysCount == dto.WeekendDays)
                    {
                        weekendDaysCount = 0;
                        workDaysCount = 1;
                        isWorkDay = true;
                    }
                    else
                    {
                        weekendDaysCount++;
                    }
                }
            }
        }

        public async Task ClearSchedule(int employeeId)
        {
            var schedules = await _context.Schedule
                .Where(schedule => schedule.EmployeeId == employeeId &&
                    schedule.Date > DateOnly.FromDateTime(DateTime.Now))
                .ToListAsync();
            var isAppointedExists = false;

            foreach (var schedule in schedules)
            {
                if (await CheckIsAppointed(schedule.Id))
                {
                    isAppointedExists = true;
                }
                else
                {
                    _context.Schedule.Remove(schedule);
                }
            }

            await _context.SaveChangesAsync();

            if (isAppointedExists)
            {
                throw new Exception("One or more schedules has appointment");
            }
        }

        public async Task Update(int id, ScheduleDto scheduleDto)
        {
            if (scheduleDto.Id != id)
            {
                throw new Exception("Schedule Id is not equal to id");
            }

            var schedule = _mapper.Map<Schedule>(scheduleDto);

            _context.Entry(schedule).State = EntityState.Modified;

            await _context.SaveChangesAsync();
        }
    }
}
