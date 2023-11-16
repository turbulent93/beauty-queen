namespace BeautyQueenApi.Services.UploadService.Dtos
{
    public class ImagesDto
    {
        public IFormFileCollection Images { get; set; }
        public int UserId { get; set; }
        public int[]? PrevImagesId { get; set; }
    }
}
