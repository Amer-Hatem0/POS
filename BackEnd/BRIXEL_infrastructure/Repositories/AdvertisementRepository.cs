using BRIXEL_core.DTOs;
using BRIXEL_core.Interface;
using BRIXEL_core.Models;
using BRIXEL_infrastructure.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;

namespace BRIXEL_infrastructure.Repositories
{
    public class AdvertisementRepository : IAdvertisementRepository
    {
        private readonly AppDbContext _context;
        private readonly IHostEnvironment _env;

        public AdvertisementRepository(AppDbContext context, IHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        public async Task<List<AdvertisementResponseDto>> GetAllAsync()
        {
            var ads = await _context.Advertisements
                .Include(a => a.Category)
                .Include(a => a.MediaFiles)
                .OrderByDescending(a => a.CreatedAt)
                .ToListAsync();

            return ads.Select(ToResponseDto).ToList();
        }

        public async Task<AdvertisementResponseDto?> GetByIdAsync(int id)
        {
            var ad = await _context.Advertisements
                .Include(a => a.Category)
                .Include(a => a.MediaFiles)
                .FirstOrDefaultAsync(a => a.Id == id);

            return ad is null ? null : ToResponseDto(ad);
        }

        public async Task<AdvertisementResponseDto> CreateAsync(AdvertisementDto dto, string userId)
        {
            var ad = new Advertisement
            {
                Title = dto.Title,
                TitleAr = dto.TitleAr,              
                Content = dto.Content,
                ContentAr = dto.ContentAr,          
                IsPublished = dto.IsPublished,
                ExpirationDate = dto.ExpirationDate,
                CategoryId = dto.CategoryId,
                CreatedAt = DateTime.UtcNow,
                CreatedById = userId
            };


            
            if (dto.Image != null)
            {
                var imagePath = await SaveFile(dto.Image);
                ad.ImageUrl = imagePath;
            }

        
            if (dto.MediaFiles != null)
            {
                foreach (var file in dto.MediaFiles)
                {
                    var mediaPath = await SaveFile(file);
                    ad.MediaFiles.Add(new MediaFile { FilePath = mediaPath });
                }
            }

            _context.Advertisements.Add(ad);
            await _context.SaveChangesAsync();
            return ToResponseDto(ad);
        }

        public async Task<bool> UpdateAsync(int id, AdvertisementDto dto)
        {
            var ad = await _context.Advertisements
                .Include(a => a.MediaFiles)
                .FirstOrDefaultAsync(a => a.Id == id);

            if (ad == null) return false;

            ad.Title = dto.Title;
            ad.TitleAr = dto.TitleAr;               
            ad.Content = dto.Content;
            ad.ContentAr = dto.ContentAr;           

            ad.IsPublished = dto.IsPublished;
            ad.ExpirationDate = dto.ExpirationDate;
            ad.CategoryId = dto.CategoryId;

       
            if (dto.Image != null)
            {
                var imagePath = await SaveFile(dto.Image);
                ad.ImageUrl = imagePath;
            }

    
            if (dto.MediaFiles != null && dto.MediaFiles.Any())
            {
                foreach (var file in dto.MediaFiles)
                {
                    var mediaPath = await SaveFile(file);
                    ad.MediaFiles.Add(new MediaFile { FilePath = mediaPath });
                }
            }

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var ad = await _context.Advertisements
                .Include(a => a.MediaFiles)
                .FirstOrDefaultAsync(a => a.Id == id);

            if (ad == null) return false;

            _context.Advertisements.Remove(ad);
            await _context.SaveChangesAsync();
            return true;
        }

 
        private AdvertisementResponseDto ToResponseDto(Advertisement ad)
        {
            return new AdvertisementResponseDto
            {
                Id = ad.Id,
                Title = ad.Title,
                TitleAr = ad.TitleAr,                
                Content = ad.Content,
                ContentAr = ad.ContentAr,            

                IsPublished = ad.IsPublished,
                ExpirationDate = ad.ExpirationDate,
                CreatedAt = ad.CreatedAt,
                CreatedById = ad.CreatedById,
                ImageUrl = ad.ImageUrl,
                CategoryId = ad.CategoryId,
                CategoryName = ad.Category?.Name,
                MediaUrls = ad.MediaFiles?.Select(m => m.FilePath).ToList() ?? new List<string>()
            };
        }

     
        private async Task<string> SaveFile(IFormFile file)
        {
            var folder = Path.Combine("uploads", "ads");
            var fileName = $"{Guid.NewGuid()}_{file.FileName}";
            var rootPath = _env.ContentRootPath;
            var fullPath = Path.Combine(rootPath, "wwwroot", folder, fileName);

            Directory.CreateDirectory(Path.GetDirectoryName(fullPath)!);

            using var stream = new FileStream(fullPath, FileMode.Create);
            await file.CopyToAsync(stream);

            return "/" + Path.Combine(folder, fileName).Replace("\\", "/");
        }
    }
}
