namespace BeautyQueenApi.Requests.Services
{
    public class ServiceDto
    {
        public int? Id { get; set; }
        public string Name { get; set; } = null!;
        public int Price { get; set; }
        public int Duration { get; set; }
    }
}
