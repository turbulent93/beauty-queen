using BeautyQueenApi.Data;
using BeautyQueenApi.Models;
using BeautyQueenApi.Repositories.PromoRepository.Dtos;
using BeautyQueenApi.Repositories.PromotionsRepository;
using BeautyQueenApi.Services.UploadService;
using MapsterMapper;
using Microsoft.EntityFrameworkCore;

namespace BeautyQueenApi.Repositories.PromoRepository
{
    public class PromoRepository : IPromoRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly IUploadService _uploadService;

        public PromoRepository(ApplicationDbContext context, IMapper mapper, IUploadService uploadService)
        {
            _context = context;
            _mapper = mapper;
            _uploadService = uploadService;
        }

        public async Task<Promotion> Add(PromoDto promoDto)
        {
            var promo = _mapper.Map<Promotion>(promoDto);

            _context.Promo.Add(promo);

            await _context.SaveChangesAsync();

            _context.Entry(promo).Collection(x => x.Services).Load();

            await SetServices(promo, promoDto.ServiceIds);

            return promo;
        }

        public async Task<IEnumerable<Promotion>> Get()
        {
            return await _context.Promo
                .Include(x => x.Services)
                .Include(X => X.Unit)
                .ToListAsync();
        }

        public async Task<Promotion> GetById(int id)
        {
            var promotion = await _context.Promo.FindAsync(id);

            if (promotion == null)
            {
                throw new Exception("Promo is not found");
            }

            _context.Entry(promotion).Collection(x => x.Services).Load();
            _context.Entry(promotion).Reference(x => x.Unit).Load();

            return promotion;
        }

        public async Task Remove(int id)
        {
            var promotion = await _context.Promo.FindAsync(id);

            if (promotion == null)
            {
                throw new Exception("Promo is not found");
            }

            _context.Promo.Remove(promotion);

            await _context.SaveChangesAsync();
        }

        public async Task Update(int id, PromoDto promoDto)
        {
            var promotion = _mapper.Map<Promotion>(promoDto);
            var curPromo = _context.Promo.FirstOrDefault(p => p.Id == promoDto.Id);

            _context.Entry(promotion).State = EntityState.Modified;

            await _context.SaveChangesAsync();

            _context.Entry(promotion).Collection(x => x.Services).Load();

            await SetServices(promotion, promoDto.ServiceIds);
        }

        private async Task SetServices(Promotion promotion, List<int> serviceIds)
        {
            foreach (var serviceId in serviceIds)
            {
                Service? service = await _context.Service.FindAsync(serviceId);

                if (service == null)
                {
                    throw new Exception($"Service with id {serviceId} is not found");
                }

                promotion.Services.Add(service);
            }

            await _context.SaveChangesAsync();
        }
    }
}
