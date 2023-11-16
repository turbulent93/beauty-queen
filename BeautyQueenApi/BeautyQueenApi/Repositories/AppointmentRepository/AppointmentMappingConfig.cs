using BeautyQueenApi.Models;
using BeautyQueenApi.Repositories.AppointmentRepository.Dtos;
using Mapster;

namespace BeautyQueenApi.Repositories.AppointmentRepository
{
    public class AppointmentMappingConfig : IRegister
    {
        public void Register(TypeAdapterConfig config)
        {
            config.NewConfig<RequestAppointmentDto, Appointment>();

            config.NewConfig<Appointment, ResponseAppointmentDto>()
                .Map(dest => dest.Promo, src => src.Promotion != null ? src.Promotion.Title : null)
                .Map(dest => dest.Service, src => src.Service.Name)
                .Map(dest => dest.Date, src => src.Schedule.Date)
                .Map(
                    dest => dest.Discount,
                    src => src.Promotion != null ? src.Promotion.Discount + src.Promotion.Unit.Name : null)
                .Map(
                    dest => dest.DiscountedPrice,
                    src => src.Promotion != null ? src.Service.Price - (
                            src.Promotion.Unit.Name == "р" ?
                                src.Promotion.Discount :
                                (src.Service.Price / 100) * src.Promotion.Discount) : src.Service.Price);
        }
    }
}
