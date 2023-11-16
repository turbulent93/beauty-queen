using BeautyQueenApi.Constants;
using BeautyQueenApi.Data;
using BeautyQueenApi.Models;
using BeautyQueenApi.Services.UploadService.Dtos;
using Microsoft.EntityFrameworkCore;

namespace BeautyQueenApi.Services.UploadService
{
    public class UploadService : IUploadService
    {
        private readonly IWebHostEnvironment _appEnvironment;
        private readonly ApplicationDbContext _context;
        public UploadService(IWebHostEnvironment appEnvironment, ApplicationDbContext context)
        {
            _appEnvironment = appEnvironment;
            _context = context;
        }

        public async Task<List<Image>> UploadAsync(FilesDto filesDto)
        {
            List<Image> files = new();

            foreach (var file in filesDto.Files)
            {
                string fileName = Guid.NewGuid() + Path.GetExtension(file.FileName);
                string path = Path.Combine(
                    _appEnvironment.WebRootPath,
                    "files",
                    fileName);

                using var fileStream = new FileStream(path, FileMode.Create);
                await file.CopyToAsync(fileStream);

                var newFile = new Image
                {
                    Source = Path.Combine("files", fileName),
                    Status = ImageStatuses.UPLOADED_STATUS,
                    UserId = filesDto.UserId
                };

                _context.Image.Add(newFile);

                await _context.SaveChangesAsync();

                files.Add(newFile);
            }


            return files;
        }

        public async Task RemoveAsync(int id)
        {
            var file = await _context.Image.FirstOrDefaultAsync(f => f.Id == id);

            if (file == null)
            {
                throw new Exception("File does not exist");
            }

            string path = Path.Combine(
                    _appEnvironment.WebRootPath,
                    "files",
                    file.Source);

            if (File.Exists(path))
            {
                File.Delete(path);

                _context.Image.Remove(file);

                await _context.SaveChangesAsync();
            }
        }
    }
}
