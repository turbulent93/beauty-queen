using System.ComponentModel.DataAnnotations;

namespace BeautyQueenApi.Models
{
    public class PermissionGroup
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; } = null!;
    }
}
