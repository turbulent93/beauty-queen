using BeautyQueenApi.Data;
using BeautyQueenApi.Models;
using BeautyQueenApi.Requests.Pagination;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BeautyQueenApi.Requests.Services
{
    public class GetServicesRequest : PaginationRequest, IRequest<PaginationResponse<ServiceDto>> {
        public class Handler : IRequestHandler<GetServicesRequest, PaginationResponse<ServiceDto>> {
            private readonly ApplicationDbContext _context;

            public Handler(ApplicationDbContext context)
            {
                _context = context;
            }

            public async Task<PaginationResponse<ServiceDto>> Handle(
                GetServicesRequest request, CancellationToken cancellationToken
            ) {
                var items = await _context.Service.ToListAsync(cancellationToken);

                return new PaginationResponse<ServiceDto>(items.Adapt<List<ServiceDto>>(), request.Page, request.Size);
            }
        }
    }
}