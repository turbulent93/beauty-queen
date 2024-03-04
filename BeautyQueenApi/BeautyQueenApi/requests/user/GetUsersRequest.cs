using BeautyQueenApi.Data;
using BeautyQueenApi.Models;
using BeautyQueenApi.Requests.Pagination;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BeautyQueenApi.Requests.Users
{
    public class GetUsersRequest : PaginationRequest, IRequest<PaginationResponse<UserDto>> {
        public class Handler : IRequestHandler<GetUsersRequest, PaginationResponse<UserDto>> {
            private readonly ApplicationDbContext _context;

            public Handler(ApplicationDbContext context)
            {
                _context = context;
            }

            public async Task<PaginationResponse<UserDto>> Handle(
                GetUsersRequest request, CancellationToken cancellationToken
            ) {
                var items = await _context.User.ToListAsync(cancellationToken);

                return new PaginationResponse<UserDto>(items.Adapt<List<UserDto>>(), request.Page, request.Size);
            }
        }
    }
}