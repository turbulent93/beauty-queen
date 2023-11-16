namespace BeautyQueenApi.Repositories.UserRepository.Dtos
{
    public class RequestUserDto
    {
        public int Id { get; set; }
        public string Login { get; set; }
        public int RoleId { get; set; }
        public string? OldPassword { get; set; }
        public string? NewPassword { get; set; }
    }
}
