using BeautyQueenApi.Data;
using BeautyQueenApi.Models;
using BeautyQueenApi.Requests.Users;
using Mapster;
using Microsoft.EntityFrameworkCore;

namespace BeautyQueenApi.Services.UserService
{
    public class UserService : IUserService
    {
        private readonly ApplicationDbContext _context;
        
        public UserService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<UserDto> CreateOrUpdateAsync(CreateOrUpdateUserRequest request)
        {
            User? item;
            if(request.Id != null) {
                item = await _context
                    .User
                    .Include(u => u.Roles)
                    .FirstOrDefaultAsync(i => i.Id == request.Id)
                        ?? throw new Exception("Пользователь не найден");

                item.Update(request);

            } else {
                item = new(
                    request.Login,
                    BCrypt.Net.BCrypt.HashPassword(request.Password)
                );

                _context.User.Add(item);
            }

            await _context.SaveChangesAsync();

            await AssignRolesToUser(item, request.RoleIds);

            return item.Adapt<UserDto>();
        }

        public async Task AssignRolesToUser(User user, int[] roleIds) {
            var userRoleIds = user.Roles.Select(r => r.Id);

            if(userRoleIds.All(r => roleIds.Contains(r)) && roleIds.Length == userRoleIds.Count()) {
                return;
            }

            var rolesToAdd = roleIds.Where(r => !userRoleIds.Contains(r));

            foreach(var roleId in rolesToAdd) {
                var role = await _context.Role.FirstOrDefaultAsync(r => r.Id == roleId)
                    ?? throw new Exception("Роль не найдена");

                user.Roles.Add(role);
            }

            var rolesToRemove = user.Roles.Where(r => !roleIds.Contains(r.Id));

            _context.Role.RemoveRange(rolesToRemove);

            await _context.SaveChangesAsync();
        }
    }
}
