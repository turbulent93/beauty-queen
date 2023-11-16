using BeautyQueenApi.Models;
using BeautyQueenApi.Repositories.PhotoRepository;
using BeautyQueenApi.Repositories.PhotoRepository.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BeautyQueenApi.Controllers
{
    [Route("api/gallery")]
    [ApiController]
    public class GalleryController : ControllerBase
    {
        private readonly IPhotoRepository _photoRepository;

        public GalleryController(IPhotoRepository photoRepository)
        {
            _photoRepository = photoRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Photo>>> Get(int? serviceId)
        {
            try
            {
                return Ok(await _photoRepository.Get(serviceId));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> PutPhoto(int id, Photo photo)
        {
            try
            {
                await _photoRepository.Update(id, photo);
                return NoContent();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Photo>> PostPhoto(PhotoDto photoDto)
        {
            try
            {
                var photo = await _photoRepository.Add(photoDto);

                return CreatedAtAction(nameof(PostPhoto), new { id = photo.Id }, photo);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeletePhoto(int id)
        {
            try
            {
                await _photoRepository.Remove(id);
                return NoContent();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
