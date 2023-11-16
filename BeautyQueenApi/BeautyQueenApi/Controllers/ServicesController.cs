using BeautyQueenApi.Constants;
using BeautyQueenApi.Models;
using BeautyQueenApi.Repositories.ServiceRepository;
using BeautyQueenApi.Repositories.ServiceRepository.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BeautyQueenApi.Controllers
{
    [Route("api/services")]
    [ApiController]
    public class ServicesController : ControllerBase
    {
        private readonly IServiceRepository _serviceRepository;

        public ServicesController(IServiceRepository serviceService)
        {
            _serviceRepository = serviceService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ServiceDto>>> GetService(string? search, int? promoId, int? employeeId)
        {
            try
            {
                return Ok(await _serviceRepository.Get(search, promoId, employeeId));
            }
            catch (Exception)
            {
                return NotFound();
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ServiceDto>> GetService(int id)
        {
            try
            {
                return Ok(await _serviceRepository.GetById(id));
            }
            catch (Exception)
            {
                return NotFound();
            }
        }

        [HttpPut("{id}")]
        [Authorize(Roles = RoleOptions.ADMIN_MASTER_ROLE_NAMES)]
        public async Task<IActionResult> PutService(int id, ServiceDto serviceDto)
        {
            try
            {
                await _serviceRepository.Update(id, serviceDto);
                return NoContent();
            }
            catch (Exception)
            {
                return NotFound();
            }
        }

        [HttpPost]
        [Authorize(Roles = RoleOptions.ADMIN_MASTER_ROLE_NAMES)]
        public async Task<ActionResult<Service>> PostService(ServiceDto serviceDto)
        {
            try
            {
                ServiceDto service = await _serviceRepository.Add(serviceDto);

                return CreatedAtAction(nameof(PostService), new { id = service.Id }, service);
            }
            catch (Exception)
            {
                return NotFound();
            }
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = RoleOptions.ADMIN_MASTER_ROLE_NAMES)]
        public async Task<IActionResult> DeleteService(int id)
        {
            try
            {
                await _serviceRepository.Remove(id);
                return NoContent();
            }
            catch (Exception)
            {
                return NotFound();
            }
        }
    }
}
