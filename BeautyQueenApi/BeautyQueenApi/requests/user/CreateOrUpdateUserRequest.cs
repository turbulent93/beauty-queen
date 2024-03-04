using BeautyQueenApi.Data;
using BeautyQueenApi.Models;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BeautyQueenApi.Requests.Users
{
    public class CreateOrUpdateUserRequest : UserDto, IRequest<UserDto> {
        public int[] RoleIds { get; set; } = null!;
    }
}