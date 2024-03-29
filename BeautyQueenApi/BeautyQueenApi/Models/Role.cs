﻿using System.ComponentModel.DataAnnotations;

namespace BeautyQueenApi.Models
{
    public class Role
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; } = null!;

        public List<Permission> Permissions { get; set; } = null!;
    }
}
