using BRIXEL_core.DTOs;
using BRIXEL_core.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BRIXEL.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TestimonialController : ControllerBase
    {
        private readonly ITestimonialService _testimonialService;

        public TestimonialController(ITestimonialService testimonialService)
        {
            _testimonialService = testimonialService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var testimonials = await _testimonialService.GetAllAsync();
            return Ok(testimonials);
        }

        [HttpPost]
        [Authorize(Roles = "Admin,Publisher")]
        public async Task<IActionResult> Create([FromForm] TestimonialDto dto)
        {
            var result = await _testimonialService.CreateAsync(dto);
            return result ? Ok("Created") : BadRequest("Failed to create");
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _testimonialService.DeleteAsync(id);
            return result ? Ok("Deleted") : NotFound("Not found");
        }
    }
}
