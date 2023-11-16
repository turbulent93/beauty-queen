using BeautyQueenApi.Constants;
using BeautyQueenApi.Models;
using BeautyQueenApi.Repositories.ScheduleRepository;
using BeautyQueenApi.Repositories.ScheduleRepository.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BeautyQueenApi.Controllers
{
    [Route("api/schedules")]
    [ApiController]
    public class SchedulesController : ControllerBase
    {
        private readonly IScheduleRepository _scheduleRepository;

        public SchedulesController(IScheduleRepository scheduleRepository)
        {
            _scheduleRepository = scheduleRepository;
        }

        [HttpGet("{employeeId}")]
        public async Task<ActionResult<IEnumerable<Schedule>>> GetSchedule(int employeeId, int? year, int? month)
        {
            try
            {
                return Ok(await _scheduleRepository.Get(employeeId, year, month));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost("fill")]
        [Authorize(Roles = RoleOptions.ADMIN_MASTER_ROLE_NAMES)]
        public async Task<ActionResult> FillSchedule(FillScheduleDto dto)
        {
            try
            {
                await _scheduleRepository.FillSchedule(dto);

                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost]
        [Authorize(Roles = RoleOptions.ADMIN_MASTER_ROLE_NAMES)]
        public async Task<ActionResult<Schedule>> PostSchedule(ScheduleDto scheduleDto)
        {
            try
            {
                var schedule = await _scheduleRepository.Add(scheduleDto);

                return CreatedAtAction(nameof(PostSchedule), new { id = schedule.Id }, schedule);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut("{id}")]
        [Authorize(Roles = RoleOptions.ADMIN_MASTER_ROLE_NAMES)]
        public async Task<ActionResult<Schedule>> UpdateSchedule(int id, ScheduleDto scheduleDto)
        {
            try
            {
                await _scheduleRepository.Update(id, scheduleDto);

                return NoContent();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = RoleOptions.ADMIN_MASTER_ROLE_NAMES)]
        public async Task<IActionResult> DeleteSchedule(int id)
        {
            try
            {
                await _scheduleRepository.Remove(id);

                return NoContent();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
