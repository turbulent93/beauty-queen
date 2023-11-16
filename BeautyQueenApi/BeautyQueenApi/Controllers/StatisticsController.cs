using BeautyQueenApi.Services.StatisticService;
using BeautyQueenApi.Services.StatisticService.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BeautyQueenApi.Controllers
{
    [Route("api/statistics")]
    [ApiController]
    public class StatisticsController : ControllerBase
    {
        private readonly IStatisticService _statisticService;

        public StatisticsController(IStatisticService statisticService)
        {
            _statisticService = statisticService;
        }

        [HttpGet("revenue")]
        [Authorize]
        public async Task<ActionResult<ResponseStatisticDto>> GetAppStatistics(string? startDate, string? endDate, int? employeeId)
        {
            try
            {
                return Ok(await _statisticService.GetRevenueStatistic(startDate, endDate, employeeId));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("users")]
        [Authorize]
        public async Task<ActionResult<ResponseStatisticDto>> GetUsersStatistics(string? startDate, string? endDate, int? employeeId)
        {
            try
            {
                return Ok(await _statisticService.GetUserStatistic(startDate, endDate, employeeId));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
