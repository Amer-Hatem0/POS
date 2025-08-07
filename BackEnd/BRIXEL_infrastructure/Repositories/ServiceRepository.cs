using BRIXEL_core.DTOs;
using BRIXEL_core.Interface;
using BRIXEL_core.Models;
using BRIXEL_core.Models.DTOs;
using BRIXEL_infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace BRIXEL_infrastructure.Repositories
{
    public class ServiceRepository : IServiceRepository
    {
        private readonly AppDbContext _context;
        private readonly ILogger<ServiceRepository> _logger;

        public ServiceRepository(AppDbContext context, ILogger<ServiceRepository> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<List<Service>> GetAllAsync()
        {
            try
            {
                return await _context.Services
                    .Include(s => s.Category)  
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in GetAllAsync()");
                throw;
            }
        }



        public async Task<Service?> GetByIdAsync(int id)
        {
            try
            {
                return await _context.Services
                    .Include(s => s.Category)
                    .FirstOrDefaultAsync(s => s.Id == id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error in GetByIdAsync(id={id})");
                throw;
            }
        }


        public async Task<Service> CreateAsync(ServiceDto dto)
        {
            var service = new Service
            {
                Title = dto.Title,
                Description = dto.Description,
                TitleAr = dto.TitleAr,
                DescriptionAr = dto.DescriptionAr,
                IconUrl = dto.IconUrl,
                CategoryId = dto.CategoryId,
                CreatedAt = DateTime.UtcNow
            };

            _context.Services.Add(service);
            await _context.SaveChangesAsync();
            return service;
        }

        public async Task<bool> UpdateAsync(int id, ServiceDto dto)
        {
            var service = await _context.Services.FindAsync(id);
            if (service == null) return false;

            service.Title = dto.Title;
            service.Description = dto.Description;
            service.TitleAr = dto.TitleAr;
            service.DescriptionAr = dto.DescriptionAr;
            service.IconUrl = dto.IconUrl;
            service.CategoryId = dto.CategoryId;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> ToggleVisibilityAsync(int id)
        {
            var service = await _context.Services.FindAsync(id);
            if (service == null) return false;

            service.IsVisible = !service.IsVisible;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            try
            {
                var service = await _context.Services.FindAsync(id);
                if (service == null) return false;

                _context.Services.Remove(service);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error in DeleteAsync(id={id})");
                throw;
            }
        }
    }
}