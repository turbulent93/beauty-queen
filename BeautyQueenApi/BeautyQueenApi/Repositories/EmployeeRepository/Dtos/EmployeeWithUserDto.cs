using BeautyQueenApi.Models;

namespace BeautyQueenApi.Repositories.EmployeeRepository.Dtos
{
    public class EmployeeWithUserDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public Specialization Specialization { get; set; }
        public string Image { get; set; }
        public List<Service> Services { get; set; }
        public User User { get; set; }
    }
}
