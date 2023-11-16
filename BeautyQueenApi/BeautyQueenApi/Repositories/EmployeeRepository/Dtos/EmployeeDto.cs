namespace BeautyQueenApi.Repositories.EmployeeRepository.Dtos
{
    public class EmployeeDto
    {
        public int? Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public int SpecializationId { get; set; }
        public List<int> ServiceIds { get; set; }
        public int UserId { get; set; }
        public int? ImageId { get; set; }
    }
}