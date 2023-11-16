using BeautyQueenApi.Models;
using BeautyQueenApi.Repositories.MetaRepository;
using Microsoft.AspNetCore.Mvc;

namespace BeautyQueenApi.Controllers
{
    [Route("api/meta")]
    [ApiController]
    public class MetaController : ControllerBase
    {
        private readonly IMetaRepository _metaRepository;

        public MetaController(IMetaRepository metaRepository)
        {
            _metaRepository = metaRepository;
        }

        [HttpGet]
        public async Task<ActionResult<Meta>> GetSettings()
        {
            try
            {
                return await _metaRepository.Get();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [HttpPut]
        public async Task<IActionResult> PutSettings(Meta meta)
        {
            try
            {
                await _metaRepository.Update(meta);

                return NoContent();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
