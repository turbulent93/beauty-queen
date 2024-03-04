using System.ComponentModel.DataAnnotations;

namespace BeautyQueenApi.Models
{
    public class Permission
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public int GroupId { get; set; }

        public PermissionGroup Group { get; set; } = null!;
        public List<Role> Roles { get; set; } = null!;
    }
}
