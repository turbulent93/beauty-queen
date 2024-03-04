using BeautyQueenApi.Requests.Pagination;
using BeautyQueenApi.Requests.Permission;
using BeautyQueenApi.Requests.Services;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace BeautyQueenApi.Controllers
{
    [Route("api/permissions")]
    [ApiController]
    public class PermissionsController : ControllerBase
    {
        private readonly ISender _mediator;

        public PermissionsController(ISender mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("get")]
        public async Task<ActionResult<PaginationResponse<PermissionDto>>> Get(GetPermissionsRequest request)
        {
            return await _mediator.Send(request);
        }
    }
}
