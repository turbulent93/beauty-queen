using BeautyQueenApi.Constants;
using BeautyQueenApi.Models;
using BeautyQueenApi.Repositories.AppointmentRepository;
using BeautyQueenApi.Repositories.AppointmentRepository.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BeautyQueenApi.Controllers
{
    [Route("api/appointments")]
    [ApiController]
    public class AppointmentsController : ControllerBase
    {
        private readonly IAppointmentRepository _appoinmentRepository;

        public AppointmentsController(IAppointmentRepository appointmentService)
        {
            _appoinmentRepository = appointmentService;
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<ResponseAppointmentDto>>> Get(int employeeId, int scheduleId)
        {
            try
            {
                return Ok(await _appoinmentRepository.Get(employeeId, scheduleId));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult<Appointment>> PostAppointment(RequestAppointmentDto appointmentDto)
        {
            try
            {
                var appointment = await _appoinmentRepository.Add(appointmentDto);

                return CreatedAtAction(nameof(PostAppointment), new { id = appointment.Id }, appointment);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = RoleOptions.ADMIN_MASTER_ROLE_NAMES)]
        public async Task<IActionResult> DeleteAppointment(int id)
        {
            try
            {
                await _appoinmentRepository.Remove(id);

                return NoContent();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
