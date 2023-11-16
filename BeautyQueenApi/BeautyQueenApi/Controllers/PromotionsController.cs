using BeautyQueenApi.Constants;
using BeautyQueenApi.Models;
using BeautyQueenApi.Repositories.PromoRepository.Dtos;
using BeautyQueenApi.Repositories.PromotionsRepository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BeautyQueenApi.Controllers
{
    [Route("api/promo")]
    [ApiController]
    public class PromotionsController : ControllerBase
    {
        private readonly IPromoRepository _promoRepository;

        public PromotionsController(IPromoRepository promoRepository)
        {
            _promoRepository = promoRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Promotion>>> GetPromo()
        {
            try
            {
                return Ok(await _promoRepository.Get());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Promotion>> GetPromotion(int id)
        {
            try
            {
                return Ok(await _promoRepository.GetById(id));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut("{id}")]
        [Authorize(Roles = RoleOptions.ADMIN_MASTER_ROLE_NAMES)]
        public async Task<IActionResult> PutPromotion(int id, PromoDto promoDto)
        {
            try
            {
                await _promoRepository.Update(id, promoDto);
                return NoContent();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost]
        [Authorize(Roles = RoleOptions.ADMIN_MASTER_ROLE_NAMES)]
        public async Task<ActionResult<Promotion>> PostPromotion(PromoDto promoDto)
        {
            try
            {
                var promo = await _promoRepository.Add(promoDto);

                return CreatedAtAction("GetPromotion", new { id = promo.Id }, promo);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = RoleOptions.ADMIN_MASTER_ROLE_NAMES)]
        public async Task<IActionResult> DeletePromotion(int id)
        {
            try
            {
                await _promoRepository.Remove(id);
                return NoContent();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
