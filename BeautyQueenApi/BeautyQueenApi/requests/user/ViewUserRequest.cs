using BeautyQueenApi.Data;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BeautyQueenApi.Requests.Users
{
    public class ViewUserRequest : IRequest<UserDto> {
        public int Id { get; set; }
        
        public class Handler : IRequestHandler<ViewUserRequest, UserDto> {
            private readonly ApplicationDbContext _context;

            public Handler(ApplicationDbContext context)
            {
                _context = context;
            }

            public async Task<UserDto> Handle(
                ViewUserRequest request, CancellationToken cancellationToken
            ) {
                var item = await _context.Service.FirstOrDefaultAsync(i => i.Id == request.Id, cancellationToken)
                    ?? throw new Exception("Пользователь не найден");

                return item.Adapt<UserDto>();
            }
        }
    }
}