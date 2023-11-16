using BeautyQueenApi.Models;
using BeautyQueenApi.Services.UploadService.Dtos;

namespace BeautyQueenApi.Services.UploadService
{
    public interface IUploadService
    {
        public Task<List<Image>> UploadAsync(FilesDto filesDto);
        public Task RemoveAsync(int id);
    }
}
