using BeautyQueenApi.Models;
using BeautyQueenApi.Repositories.UnitRepository;
using Microsoft.AspNetCore.Mvc;

namespace BeautyQueenApi.Controllers
{
    [Route("api/units")]
    [ApiController]
    public class UnitsController : ControllerBase
    {
        private readonly IUnitRepository _unitRepository;

        public UnitsController(IUnitRepository unitRepository)
        {
            _unitRepository = unitRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Unit>>> GetUnit()
        {
            try
            {
                return Ok(await _unitRepository.Get());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
