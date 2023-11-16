﻿using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace BeautyQueenApi.Models
{
    [Index(nameof(Login), IsUnique = true)]
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string Login { get; set; }
        [JsonIgnore]
        public string Password { get; set; }
        [JsonIgnore]
        public string? RefreshToken { get; set; }
        [JsonIgnore]
        public DateTime? ExpiresIn { get; set; }
        [JsonIgnore]
        public int RoleId { get; set; }
        public Role Role { get; set; }
        [JsonIgnore]
        public Employee Employee { get; set; }
    }
}
