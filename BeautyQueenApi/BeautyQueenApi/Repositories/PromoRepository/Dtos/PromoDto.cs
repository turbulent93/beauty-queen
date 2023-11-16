namespace BeautyQueenApi.Repositories.PromoRepository.Dtos
{
    public class PromoDto
    {
        public int? Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        public int Discount { get; set; }
        public List<int> ServiceIds { get; set; }
        public DateOnly? PeriodFrom { get; set; }
        public DateOnly? PeriodTo { get; set; }
        public int UnitId { get; set; }
    }
}
