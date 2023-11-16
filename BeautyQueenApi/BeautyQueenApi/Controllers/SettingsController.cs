using BeautyQueenApi.Models;
using BeautyQueenApi.Repositories.SettingsRepository;
using Microsoft.AspNetCore.Mvc;

namespace BeautyQueenApi.Controllers
{
    [Route("api/settings")]
    [ApiController]
    public class SettingsController : ControllerBase
    {
        private readonly ISettingsRepository _settingsRepository;

        public SettingsController(ISettingsRepository settingsRepository)
        {
            _settingsRepository = settingsRepository;
        }

        [HttpGet]
        public async Task<ActionResult<Settings>> Get()
        {
            try
            {
                return await _settingsRepository.Get();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut]
        public async Task<IActionResult> PutSettings(Settings settings)
        {
            try
            {
                await _settingsRepository.Update(settings);

                return NoContent();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
