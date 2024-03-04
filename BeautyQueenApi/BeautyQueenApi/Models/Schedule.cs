﻿using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace BeautyQueenApi.Models
{
    public class Schedule
    {
        [Key]
        public int Id { get; set; }
        public DateOnly Date { get; set; }
        public TimeOnly StartAt { get; set; }
        public TimeOnly EndAt { get; set; }
        public int EmployeeId { get; set; }

        public Employee Employee { get; set; } = null!;
    }
}
