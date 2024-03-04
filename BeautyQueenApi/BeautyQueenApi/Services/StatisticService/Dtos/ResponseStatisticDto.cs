namespace BeautyQueenApi.Services.StatisticService.Dtos
{
    public class ResponseStatisticDto
    {
        public List<string> Labels { get; set; } = null!;
        public List<int> Values { get; set; } = null!;
    }
}
