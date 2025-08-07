using BRIXEL_core.DTOs;
using BRIXEL_core.Interface;
using BRIXEL_core.Models;
using BRIXEL_infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Hosting;

namespace BRIXEL_infrastructure.Repositories
{
    public class TestimonialService : ITestimonialService
    {
        private readonly AppDbContext _context;
        private readonly ILogger<TestimonialService> _logger;
        private readonly IHostEnvironment _env;

        public TestimonialService(AppDbContext context, ILogger<TestimonialService> logger, IHostEnvironment env)
        {
            _context = context;
            _logger = logger;
            _env = env;
        }

        public async Task<List<Testimonial>> GetAllAsync()
        {
            return await _context.Testimonials.OrderByDescending(t => t.CreatedAt).ToListAsync();
        }

        public async Task<bool> CreateAsync(TestimonialDto dto)
        {
            try
            {
                var uploadDir = Path.Combine(_env.ContentRootPath, "wwwroot", "uploads", "testimonials");
                Directory.CreateDirectory(uploadDir);

                var fileName = $"{Guid.NewGuid()}_{dto.Image.FileName}";
                var filePath = Path.Combine(uploadDir, fileName);

                using var stream = new FileStream(filePath, FileMode.Create);
                await dto.Image.CopyToAsync(stream);

                var testimonial = new Testimonial
                {
                    ClientName = dto.ClientName,
                    ClientTitle = dto.ClientTitle,
                    Content = dto.Content,
                    ImageUrl = $"/uploads/testimonials/{fileName}",
                    CreatedAt = DateTime.UtcNow
                };

                _context.Testimonials.Add(testimonial);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating testimonial");
                return false;
            }
        }

        public async Task<bool> DeleteAsync(int id)
        {
            try
            {
                var testimonial = await _context.Testimonials.FindAsync(id);
                if (testimonial == null) return false;

                _context.Testimonials.Remove(testimonial);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting testimonial");
                return false;
            }
        }
    }
}