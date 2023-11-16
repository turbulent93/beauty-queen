using BeautyQueenApi.Models;
using BeautyQueenApi.Repositories.AppointmentRepository.Dtos;

namespace BeautyQueenApi.Repositories.AppointmentRepository
{
    public interface IAppointmentRepository
    {
        Task<IEnumerable<ResponseAppointmentDto>> Get(int employeeId, int scheduleId);
        Task<Appointment> Add(RequestAppointmentDto appointmentDto);
        Task Remove(int id);
    }
}
