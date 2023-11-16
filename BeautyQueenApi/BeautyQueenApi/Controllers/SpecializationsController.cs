using BeautyQueenApi.Constants;
using BeautyQueenApi.Models;
using BeautyQueenApi.Repositories.SpecializationRepository;
using BeautyQueenApi.Repositories.SpecializationRepository.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BeautyQueenApi.Controllers
{
    [Route("api/specializations")]
    [ApiController]
    public class SpecializationsController : ControllerBase
    {
        private readonly ISpecializationRepository _specializationRepository;

        public SpecializationsController(ISpecializationRepository specializationService)
        {
            _specializationRepository = specializationService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Specialization>>> GetSpecializations()
        {
            try
            {
                return Ok(await _specializationRepository.Get());
            }
            catch (Exception)
            {
                return NotFound();
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Specialization>> GetSpecialization(int id)
        {
            try
            {
                return Ok(await _specializationRepository.GetById(id));
            }
            catch (Exception)
            {
                return NotFound();
            }
        }

        [HttpPut("{id}")]
        [Authorize(Roles = RoleOptions.ADMIN_MASTER_ROLE_NAMES)]
        public async Task<IActionResult> PutSpecialization(int id, SpecializationDto specialization)
        {
            try
            {
                await _specializationRepository.Update(id, specialization);

                return NoContent();
            }
            catch (Exception)
            {
                return NotFound();
            }
        }

        [HttpPost]
        [Authorize(Roles = RoleOptions.ADMIN_MASTER_ROLE_NAMES)]
        public async Task<ActionResult<Specialization>> PostSpecialization(SpecializationDto specializationDto)
        {
            try
            {
                Specialization specialization = await _specializationRepository.Add(specializationDto);

                return CreatedAtAction("GetSpecialization", new { id = specialization.Id }, specialization);
            }
            catch (Exception)
            {
                return NotFound();
            }
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = RoleOptions.ADMIN_MASTER_ROLE_NAMES)]
        public async Task<IActionResult> DeleteSpecialization(int id)
        {
            try
            {
                await _specializationRepository.Remove(id);

                return NoContent();
            }
            catch (Exception)
            {
                return NotFound();
            }
        }
    }
}
