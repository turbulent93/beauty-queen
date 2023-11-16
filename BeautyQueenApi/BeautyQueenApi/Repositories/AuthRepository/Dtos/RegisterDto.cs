namespace BeautyQueenApi.Repositories.AuthRepository.Dtos
{
    public class RegisterDto
    {
        public string Login { get; set; }
        public string Password { get; set; }
        public int RoleId { get; set; }
        public string SecretKey { get; set; }
    }
}
