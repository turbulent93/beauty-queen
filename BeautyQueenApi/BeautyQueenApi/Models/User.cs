using BeautyQueenApi.Requests.Users;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace BeautyQueenApi.Models
{
    [Index(nameof(Login), IsUnique = true)]
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string Login { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string? RefreshToken { get; set; }
        public DateTime? ExpiresIn { get; set; }
        public int RoleId { get; set; }

        public List<Role> Roles { get; set; } = null!;
        public Employee Employee { get; set; } = null!;

        public User(string login, string password)
        {
            Login = login;
            Password = password;
        }

        public void Update(CreateOrUpdateUserRequest request) {
            Login = request.Login;
            Password = request.Password;
        }
    }
}
