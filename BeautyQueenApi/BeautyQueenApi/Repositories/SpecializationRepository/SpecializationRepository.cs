using BeautyQueenApi.Data;
using BeautyQueenApi.Models;
using BeautyQueenApi.Repositories.SpecializationRepository.Dtos;
using MapsterMapper;
using Microsoft.EntityFrameworkCore;

namespace BeautyQueenApi.Repositories.SpecializationRepository
{
    public class SpecializationRepository : ISpecializationRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        public SpecializationRepository(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<Specialization> GetById(int id)
        {
            var spec = await Find(id);

            if (spec == null)
            {
                throw new Exception("Specialization is not found");
            }

            return spec;
        }

        public async Task Remove(int id)
        {
            var specialization = await Find(id);

            if (specialization == null)
            {
                throw new Exception("Specialization is not found");
            }

            _context.Specialization.Remove(specialization);

            await _context.SaveChangesAsync();
        }

        public async Task<Specialization?> Find(int id)
        {
            return await _context.Specialization.FindAsync(id);
        }

        public async Task<IEnumerable<Specialization>> Get()
        {
            IEnumerable<Specialization> specializations = await _context.Specialization.ToListAsync();

            return _mapper.Map<List<Specialization>>(specializations).ToList();
        }

        public async Task<Specialization> Add(SpecializationDto specializationDto)
        {
            Specialization specialization = _mapper.Map<Specialization>(specializationDto);

            _context.Specialization.Add(specialization);

            await _context.SaveChangesAsync();

            return _mapper.Map<Specialization>(specialization);
        }

        public async Task Update(int id, SpecializationDto specializationDto)
        {
            var specialization = _mapper.Map<Specialization>(specializationDto);

            if (id != specialization.Id)
            {
                throw new Exception("Id is not equal to specialization id");
            }

            _context.Entry(specialization).State = EntityState.Modified;

            await _context.SaveChangesAsync();

            if (!ServiceExists(id))
            {
                throw new Exception("Specialization does not change");
            }
        }

        public bool ServiceExists(int id)
        {
            return (_context.Specialization?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
