using BRIXEL_core.DTOs;
using BRIXEL_core.Interface;
using BRIXEL_core.Models.DTOs;
using BRIXEL_infrastructure.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace BRIXEL.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ServiceController : ControllerBase
    {
        private readonly IServiceRepository _repo;
        private readonly ILogger<ServiceController> _logger;

        public ServiceController(IServiceRepository repo, ILogger<ServiceController> logger)
        {
            _repo = repo;
            _logger = logger;
        }

       
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var services = await _repo.GetAllAsync();
                var result = services.Select(s => new ServiceViewModel
                {
                    Id = s.Id,
                    Title = s.Title,
                    Description = s.Description,
                    TitleAr = s.TitleAr,
                    DescriptionAr = s.DescriptionAr,
                    IconUrl = s.IconUrl,
                    CategoryId = s.CategoryId,
                    CategoryName = s.Category?.Name ?? "Unknown",
                    IsVisible = s.IsVisible
                }).ToList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving services");
                return StatusCode(500, "Something went wrong.");
            }
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var service = await _repo.GetByIdAsync(id);
                if (service == null) return NotFound();
                return Ok(service);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error retrieving service with id={id}");
                return StatusCode(500, "Something went wrong.");
            }
        }

        [HttpPost]
        //[Authorize(Roles = "Admin")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> Create([FromForm] ServiceDto dto)
        {
            try
            {
                string iconPath = null;

                if (dto.Icon != null)
                {
                    var fileName = Guid.NewGuid() + Path.GetExtension(dto.Icon.FileName);
                    var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/uploads", fileName);

                    Directory.CreateDirectory(Path.GetDirectoryName(filePath)!);
                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await dto.Icon.CopyToAsync(stream);
                    }

                    iconPath = $"/uploads/{fileName}";
                }

                dto.IconUrl = iconPath;
                var result = await _repo.CreateAsync(dto);
                return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating service with icon");
                return StatusCode(500, "Unable to create service.");
            }
        }

        [HttpPut("{id}")]
        //[Authorize(Roles = "Admin")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> Update(int id, [FromForm] ServiceDto dto)
        {
            try
            {
                string iconPath = null;

                if (dto.Icon != null)
                {
                    var fileName = Guid.NewGuid() + Path.GetExtension(dto.Icon.FileName);
                    var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/uploads", fileName);

                    Directory.CreateDirectory(Path.GetDirectoryName(filePath)!);
                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await dto.Icon.CopyToAsync(stream);
                    }

                    iconPath = $"/uploads/{fileName}";
                }

                dto.IconUrl = iconPath;
                var updated = await _repo.UpdateAsync(id, dto);
                return updated ? NoContent() : NotFound();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error updating service with id={id}");
                return StatusCode(500, "Unable to update service.");
            }
        }
        [HttpPut("toggle/{id}")]
        public async Task<IActionResult> ToggleVisibility(int id)
        {
            var success = await _repo.ToggleVisibilityAsync(id);
            if (!success) return NotFound("Service not found.");
            return Ok();
        }


        [HttpDelete("{id}")]
        //[Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var deleted = await _repo.DeleteAsync(id);
                return deleted ? NoContent() : NotFound();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error deleting service with id={id}");
                return StatusCode(500, "Unable to delete service.");
            }
        }
    }
}
