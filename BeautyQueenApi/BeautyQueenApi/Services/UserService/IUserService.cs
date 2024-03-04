using BeautyQueenApi.Requests.Users;

namespace BeautyQueenApi.Services.UserService
{
    public interface IUserService
    {
        public Task<UserDto> CreateOrUpdateAsync(CreateOrUpdateUserRequest request);

    }
}
