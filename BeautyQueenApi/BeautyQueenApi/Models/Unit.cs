using System.ComponentModel.DataAnnotations;

namespace BeautyQueenApi.Models
{
    public class Unit
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
