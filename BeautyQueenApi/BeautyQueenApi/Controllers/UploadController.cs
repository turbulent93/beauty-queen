using BeautyQueenApi.Models;
using BeautyQueenApi.Services.UploadService;
using BeautyQueenApi.Services.UploadService.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BeautyQueenApi.Controllers
{
    [Route("api/upload")]
    [ApiController]
    public class UploadController : ControllerBase
    {
        private readonly IUploadService _uploadService;

        public UploadController(
            IUploadService uploadService
        )
        {
            _uploadService = uploadService;
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<List<Image>>> UploadGalleryImages([FromForm] FilesDto filesDto)
        {
            try
            {
                return await _uploadService.UploadAsync(filesDto);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult> DeleteGalleryImage(int id)
        {
            try
            {
                await _uploadService.RemoveAsync(id);

                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
