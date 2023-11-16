using BeautyQueenApi.Data;
using BeautyQueenApi.Models;
using BeautyQueenApi.Repositories.AppointmentRepository;
using BeautyQueenApi.Repositories.AppointmentRepository.Dtos;
using MapsterMapper;
using Microsoft.EntityFrameworkCore;

namespace BeautyQueenApi.Repositories.AppointmentService
{
    public class AppointmentRepository : IAppointmentRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        public AppointmentRepository(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ResponseAppointmentDto>> Get(int employeeId, int scheduleId)
        {
            return _mapper.Map<IEnumerable<ResponseAppointmentDto>>(
                await _context.Appointment
                    .Where(x => x.ScheduleId == scheduleId && x.EmployeeId == employeeId)
                    .OrderBy(x => x.StartAt)
                    .Include(x => x.Service)
                    .Include(x => x.Schedule)
                    .Include(x => x.Promotion)
                        .ThenInclude(p => p.Unit)
                    .ToListAsync());
        }

        public async Task<Appointment> Add(RequestAppointmentDto appointmentDto)
        {
            Appointment appointment = _mapper.Map<Appointment>(appointmentDto);

            _context.Appointment.Add(appointment);

            await _context.SaveChangesAsync();

            await _context.Entry(appointment).Reference(a => a.Service).LoadAsync();
            await _context.Entry(appointment).Reference(a => a.Schedule).LoadAsync();
            await _context.Entry(appointment).Reference(a => a.Employee).LoadAsync();
            await _context.Entry(appointment).Reference(a => a.Promotion).LoadAsync();

            return appointment;
        }

        public async Task Remove(int id)
        {
            if (_context.Appointment == null)
            {
                throw new Exception("Context Appointment is null");
            }

            Appointment? appointment = await _context.Appointment.FindAsync(id);

            if (appointment == null)
            {
                throw new Exception("Appointment is not found");
            }

            _context.Appointment.Remove(appointment);

            await _context.SaveChangesAsync();
        }
    }
}
