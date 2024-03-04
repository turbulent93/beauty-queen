using System.ComponentModel.DataAnnotations;
using BeautyQueenApi.Requests.Services;

namespace BeautyQueenApi.Models
{
    public class Service
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public int Price { get; set; }
        public int Duration { get; set; }
        public List<Employee> Employees { get; set; } = null!;

        public Service(string name, int price, int duration) {
            Name = name;
            Price = price;
            Duration = duration;
        }

        public void Update(CreateOrUpdateServiceRequest request) {
            Name = request.Name;
            Price = request.Price;
            Duration = request.Duration;
        }
    }
}
