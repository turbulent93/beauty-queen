using BeautyQueenApi.Constants;
using BeautyQueenApi.Data;
using BeautyQueenApi.Models;
using BeautyQueenApi.Repositories.EmployeeRepository;
using BeautyQueenApi.Repositories.EmployeeRepository.Dtos;
using MapsterMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BeautyQueenApi.Controllers
{
    [Route("api/employees")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly IEmployeeRepository _employeeRepository;
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        public EmployeesController(IEmployeeRepository employeeRepository, ApplicationDbContext context, IMapper mapper)
        {
            _employeeRepository = employeeRepository;
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee>>> Get(string? search, int? serviceId)
        {
            try
            {
                return Ok(await _employeeRepository.Get(search, serviceId));
            }
            catch (Exception e)
            {
                return NotFound(e.Message);
            }
        }

        [HttpGet("with-user")]
        [Authorize(Roles = RoleOptions.ADMIN_ROLE_NAME)]
        public async Task<ActionResult<IEnumerable<EmployeeWithUserDto>>> GetWithUser()
        {
            try
            {
                return Ok(await _employeeRepository.GetWithUser());
            }
            catch (Exception e)
            {
                return NotFound(e.Message);
            }
        }

        [HttpGet("{id}")]
        [Authorize(Roles = RoleOptions.ADMIN_ROLE_NAME)]
        public async Task<ActionResult<EmployeeWithIdsDto>> GetById(int id)
        {
            try
            {
                return Ok(await _employeeRepository.GetById(id));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> PutEmployee(int id, EmployeeDto employee)
        {
            try
            {
                await _employeeRepository.Update(id, employee);
                return NoContent();
            }
            catch (Exception e)
            {
                return NotFound(e.Message);
            }
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Employee>> PostEmployee(EmployeeDto employeeDto)
        {
            try
            {
                var employee = await _employeeRepository.Add(employeeDto);
                return CreatedAtAction(nameof(PostEmployee), new { id = employee.Id }, employee);
            }
            catch (Exception e)
            {
                return NotFound(e.Message);
            }
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            try
            {
                await _employeeRepository.Remove(id);
                return NoContent();
            }
            catch (Exception e)
            {
                return NotFound(e.Message);
            }
        }
    }
}
