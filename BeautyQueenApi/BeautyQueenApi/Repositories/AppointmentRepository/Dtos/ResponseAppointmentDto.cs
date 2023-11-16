namespace BeautyQueenApi.Repositories.AppointmentRepository.Dtos
{
    public class ResponseAppointmentDto
    {
        public int Id { get; set; }
        public string Service { get; set; }
        public string Promo { get; set; }
        public int? DiscountedPrice { get; set; }
        public string? Discount { get; set; }
        public DateOnly Date { get; set; }
        public TimeOnly StartAt { get; set; }
        public TimeOnly EndAt { get; set; }
        public string Phone { get; set; }
    }
}
