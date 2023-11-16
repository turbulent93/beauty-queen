using BeautyQueenApi.Constants;
using BeautyQueenApi.Data;
using BeautyQueenApi.Models;
using BeautyQueenApi.Repositories.EmployeeRepository.Dtos;
using MapsterMapper;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace BeautyQueenApi.Repositories.EmployeeRepository
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public EmployeeRepository(
            ApplicationDbContext context,
            IMapper mapper,
            IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _mapper = mapper;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<IEnumerable<Employee>> Get(string? search, int? serviceId)
        {
            var employees = await _context.Employee
                    .Include(x => x.Specialization)
                    .Include(x => x.Image)
                    .Include(x => x.Services)
                    .ToListAsync();

            if (serviceId != null)
            {
                var service = await _context.Service.FindAsync(serviceId);

                if (service == null)
                {
                    throw new Exception("Service is not found");
                }

                employees = employees
                    .Where(employee => employee.Services.Contains(service))
                    .ToList();
            }

            if (search != null)
            {
                employees = employees.Where(x => x.Name.ToLower().Contains(search.ToLower()) ||
                    x.Surname.ToLower().Contains(search.ToLower())).ToList();
            }

            return employees;
        }

        public async Task<IEnumerable<Employee>> GetWithUser()
        {
            return await _context.Employee
                .Include(x => x.Specialization)
                .Include(x => x.Services)
                .Include(x => x.Image)
                .Include(x => x.User)
                .ToListAsync();
        }

        public async Task<EmployeeWithIdsDto> GetById(int id)
        {
            var employee = await _context.Employee
                    .Include(x => x.Services)
                    .Include(x => x.Specialization)
                    .Include(x => x.User)
                    .FirstOrDefaultAsync(x => x.Id == id);

            if (employee == null)
            {
                throw new Exception("Employee is not found");
            }

            return _mapper.Map<EmployeeWithIdsDto>(employee);
        }

        public async Task<Employee> Add(EmployeeDto employeeDto)
        {
            var user = await _context.User.FirstOrDefaultAsync(x => x.Id == employeeDto.UserId);

            if (user == null)
            {
                throw new Exception("User is not found");
            }

            if (!IsAdmin() && !IsCurrentUser(user.Login))
            {
                throw new Exception("You can only add your employee");
            }

            Employee employee = _mapper.Map<Employee>(employeeDto);

            _context.Employee.Add(employee);

            _context.Entry(employee).Reference(x => x.Specialization).Load();
            _context.Entry(employee).Reference(x => x.User).Load();

            //await _context.SaveChangesAsync();

            _context.Entry(employee).Collection(x => x.Services).Load();

            await SetServicesByIds(employee, employeeDto.ServiceIds);

            if (!EmployeeExists(employee.Id))
            {
                throw new Exception("Employee does not post");
            }

            return employee;
        }

        public async Task Update(int id, EmployeeDto employeeDto)
        {
            var user = await _context.User.FirstOrDefaultAsync(x => x.Id == employeeDto.UserId);

            if (user == null)
            {
                throw new Exception("User is not found");
            }

            if (!IsAdmin() && !IsCurrentUser(user.Login))
            {
                throw new Exception("You can only update your employee");
            }

            if (id != employeeDto.Id)
            {
                throw new Exception("Employee id is not equal to id");
            }

            Employee employee = _mapper.Map<Employee>(employeeDto);

            _context.Entry(employee).State = EntityState.Modified;

            _context.Entry(employee).Collection(x => x.Services).Load();
            _context.Entry(employee).Reference(x => x.Specialization).Load();
            _context.Entry(employee).Reference(x => x.User).Load();

            await SetServicesByIds(employee, employeeDto.ServiceIds);

            await _context.SaveChangesAsync();

            if (!EmployeeExists(id))
            {
                throw new Exception("Employee does not change");
            }
        }

        public async Task Remove(int id)
        {
            var employee = await Find(id);

            if (employee == null)
            {
                throw new Exception("Employee is not found");
            }

            if (IsAdmin() && !IsCurrentUser(employee.User.Login))
            {
                throw new Exception("You can only delete your employee");
            }

            _context.Employee.Remove(employee);

            await _context.SaveChangesAsync();
        }

        public async Task SetServicesByIds(Employee employee, List<int> serviceIds)
        {
            employee.Services.Clear();

            foreach (int serviceId in serviceIds)
            {
                Service? service = await _context.Service.FindAsync(serviceId);

                if (service == null)
                {
                    throw new Exception($"Service with id {serviceId} is not found");
                }

                employee.Services.Add(service);
            }

            await _context.SaveChangesAsync();
        }
        public bool EmployeeExists(int id)
        {
            return (_context.Employee?.Any(e => e.Id == id)).GetValueOrDefault();
        }
        public async Task<Employee?> Find(int id)
        {
            return await _context.Employee
                .Include(x => x.User)
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        private bool IsAdmin()
        {
            return _httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.Role) == RoleOptions.ADMIN_ROLE_NAME;
        }

        private bool IsCurrentUser(string login)
        {
            return _httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.Name) == login;
        }
    }
}
