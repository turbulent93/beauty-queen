using BeautyQueenApi.Data;
using BeautyQueenApi.Models;
using BeautyQueenApi.Requests.Pagination;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BeautyQueenApi.Requests.Permission
{
    public class GetPermissionsRequest : PaginationRequest, IRequest<PaginationResponse<PermissionDto>> {
        public class Handler : IRequestHandler<GetPermissionsRequest, PaginationResponse<PermissionDto>> {
            private readonly ApplicationDbContext _context;

            public Handler(ApplicationDbContext context)
            {
                _context = context;
            }

            public async Task<PaginationResponse<PermissionDto>> Handle(
                GetPermissionsRequest request, CancellationToken cancellationToken
            ) {
                var items = await _context.Permission.ToListAsync(cancellationToken);

                return new PaginationResponse<PermissionDto>(items.Adapt<List<PermissionDto>>(), request.Page, request.Size);
            }
        }
    }
}