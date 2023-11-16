using BeautyQueenApi.Data;
using BeautyQueenApi.Models;
using BeautyQueenApi.Repositories.UserRepository.Dtos;
using MapsterMapper;
using Microsoft.EntityFrameworkCore;

namespace BeautyQueenApi.Repositories.UserRepository
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public UserRepository(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<User>> Get(string? search, bool? onlyNotEmployees, int? excludedId)
        {
            IEnumerable<User> users = await _context.User
                    .Include(x => x.Employee)
                    .Include(x => x.Role)
                    .ToListAsync();

            if (onlyNotEmployees != null)
            {
                users = users
                    .Where(e => e.Employee == null || (excludedId != null && e.Id == excludedId));
            }

            if (search != null)
                users = users.Where(x => x.Login.ToLower().Contains(search.ToLower()));

            return users;
        }

        public async Task<User> GetById(int id)
        {
            var user = await _context.User.FindAsync(id);

            if (user == null)
            {
                throw new Exception("User is not found");
            }

            _context.Entry(user).Reference(x => x.Role).Load();

            return user;
        }
        public async Task Update(int id, RequestUserDto dto)
        {
            if (id != dto.Id)
            {
                throw new Exception("Id is not equal to user id");
            }

            var user = await _context.User.FirstOrDefaultAsync(u => u.Id == id);

            if (user == null)
            {
                throw new Exception("User is not found");
            }

            if (dto.OldPassword != null && dto.NewPassword != null)
            {
                if (!BCrypt.Net.BCrypt.Verify(dto.OldPassword, user.Password))
                {
                    throw new Exception("Invalid old password");
                }

                user.Password = BCrypt.Net.BCrypt.HashPassword(dto.NewPassword);
            }
            else
            {
                user.Password = user.Password;
            }

            user.Login = dto.Login;
            user.RoleId = dto.RoleId;

            _context.Entry(user).State = EntityState.Modified;

            await _context.SaveChangesAsync();
        }

        public async Task Remove(int id)
        {
            if (id == 1)
            {
                throw new Exception("Initial user cannot be deleted");
            }

            var user = await _context.User.FindAsync(id);

            if (user == null)
            {
                throw new Exception("User is not found");
            }

            _context.User.Remove(user);

            await _context.SaveChangesAsync();
        }

    }
}
