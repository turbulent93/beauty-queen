namespace BeautyQueenApi.Services.UploadService.Dtos
{
    public class FilesDto
    {
        public IFormFileCollection Files { get; set; }
        public int UserId { get; set; }
    }
}
