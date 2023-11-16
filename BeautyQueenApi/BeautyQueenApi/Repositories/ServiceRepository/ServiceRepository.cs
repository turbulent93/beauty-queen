using BeautyQueenApi.Data;
using BeautyQueenApi.Models;
using BeautyQueenApi.Repositories.ServiceRepository.Dtos;
using MapsterMapper;
using Microsoft.EntityFrameworkCore;

namespace BeautyQueenApi.Repositories.ServiceRepository
{
    public class ServiceRepository : IServiceRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        public ServiceRepository(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task Remove(int id)
        {
            if (_context.Service == null)
            {
                throw new Exception("Context Services is null");
            }

            var service = await Find(id);
            if (service == null)
            {
                throw new Exception("Service is not found");
            }

            _context.Service.Remove(service);
            await _context.SaveChangesAsync();
        }

        public async Task<Service?> Find(int id)
        {
            return await _context.Service.FindAsync(id);
        }

        public async Task<IEnumerable<ServiceDto>> Get(string? search, int? promoId, int? employeeId)
        {
            var services = await _context.Service
                .Include(x => x.Promotions)
                .Include(x => x.Employees)
                .ToListAsync();


            if (promoId != null)
            {
                var promo = _context.Promo.Find(promoId);

                if (promo == null)
                {
                    throw new Exception("Promo is not found");
                }

                services = services
                    .Where(x => x.Promotions.Contains(promo)).ToList();
            }

            if (employeeId != null)
            {
                var employee = await _context.Employee.FindAsync(employeeId);

                if (employee == null)
                {
                    throw new Exception("Employee is not found");
                }

                services = services
                    .Where(x => x.Employees.Contains(employee)).ToList();
            }

            if (search != null)
                services = services.Where(x => x.Name.ToLower().Contains(search.ToLower())).ToList();

            return _mapper.Map<List<ServiceDto>>(services).ToList();
        }

        public async Task<ServiceDto> GetById(int id)
        {
            var service = await Find(id);

            if (service == null)
            {
                throw new Exception("Service is not found");
            }

            return _mapper.Map<ServiceDto>(service);
        }

        public async Task<ServiceDto> Add(ServiceDto serviceDto)
        {
            Service service = _mapper.Map<Service>(serviceDto);

            _context.Service.Add(service);

            await _context.SaveChangesAsync();

            return _mapper.Map<ServiceDto>(service);
        }

        public async Task Update(int id, ServiceDto serviceDto)
        {
            Service service = _mapper.Map<Service>(serviceDto);

            if (id != service.Id)
            {
                throw new Exception("Id is not equal to service id");
            }

            _context.Entry(service).State = EntityState.Modified;

            await _context.SaveChangesAsync();

            if (!ServiceExists(id))
            {
                throw new Exception("Service does not change");
            }
        }

        public bool ServiceExists(int id)
        {
            return (_context.Service?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
