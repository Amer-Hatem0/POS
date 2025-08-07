using BRIXEL_core.DTOs;
using BRIXEL_core.Interface;
using BRIXEL_core.Models.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace BRIXEL.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdvertisementController : ControllerBase
    {
        private readonly IAdvertisementRepository _repo;
        private readonly ILogger<AdvertisementController> _logger;

        public AdvertisementController(IAdvertisementRepository repo, ILogger<AdvertisementController> logger)
        {
            _repo = repo;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                return Ok(await _repo.GetAllAsync());
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving advertisements");
                return StatusCode(500, "Something went wrong.");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var ad = await _repo.GetByIdAsync(id);
                if (ad == null) return NotFound();
                return Ok(ad);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error retrieving ad with id={id}");
                return StatusCode(500, "Something went wrong.");
            }
        }

        [HttpPost]
        //[Authorize(Roles = "Admin,Publisher")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> Create([FromForm] AdvertisementDto dto)
        {
            try
            {
                string imagePath = null;
                if (dto.Image != null)
                {
                    var fileName = Guid.NewGuid() + Path.GetExtension(dto.Image.FileName);
                    var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/uploads", fileName);
                    Directory.CreateDirectory(Path.GetDirectoryName(filePath)!);
                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await dto.Image.CopyToAsync(stream);
                    }
                    imagePath = $"/uploads/{fileName}";
                }

                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

                var created = await _repo.CreateAsync(new AdvertisementDto
                {
                    Title = dto.Title,
                    Content = dto.Content,
                    IsPublished = dto.IsPublished,
                    TitleAr = dto.TitleAr,
                    ContentAr = dto.ContentAr,

                    ExpirationDate = dto.ExpirationDate,
                    Image = dto.Image,
                    MediaFiles = dto.MediaFiles,
                    CategoryId = dto.CategoryId,
                    ImageUrl = imagePath
                }, userId);


                return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating advertisement");
                return StatusCode(500, "Unable to create advertisement.");
            }
        }


        // في AdvertisementController.cs
        [HttpPut("{id}")]
        //[Authorize(Roles = "Admin")]
        [Consumes("multipart/form-data")]  
        public async Task<IActionResult> Update(int id, [FromForm] AdvertisementDto dto) 
        {
            try
            {
                
                string imagePath = null;
                if (dto.Image != null)
                {
                    var fileName = Guid.NewGuid() + Path.GetExtension(dto.Image.FileName);
                    var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/uploads/ads", fileName);
                    Directory.CreateDirectory(Path.GetDirectoryName(filePath)!);
                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await dto.Image.CopyToAsync(stream);
                    }
                    imagePath = $"/uploads/ads/{fileName}";
                }

        
                var updated = await _repo.UpdateAsync(id, new AdvertisementDto
                {
                    Title = dto.Title,
                    Content = dto.Content,
                    IsPublished = dto.IsPublished,
                    TitleAr = dto.TitleAr,
                    ContentAr = dto.ContentAr,

                    ExpirationDate = dto.ExpirationDate,
                    CategoryId = dto.CategoryId,
                    Image = dto.Image, 
                    MediaFiles = dto.MediaFiles,  
                    ImageUrl = imagePath  
                });

                return updated ? NoContent() : NotFound();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error updating advertisement with id={id}");
                return StatusCode(500, "Unable to update advertisement.");
            }
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
                _logger.LogError(ex, $"Error deleting advertisement with id={id}");
                return StatusCode(500, "Unable to delete advertisement.");
            }
        }
    }
}
