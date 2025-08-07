using BRIXEL_core.DTOs;
using BRIXEL_core.Interface;
using BRIXEL_core.Models;
using BRIXEL_infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Hosting;

namespace BRIXEL_infrastructure.Repositories
{
    public class ProjectService : IProjectService
    {
        private readonly AppDbContext _context;
        private readonly ILogger<ProjectService> _logger;
        private readonly IHostEnvironment _env;

        public ProjectService(AppDbContext context, ILogger<ProjectService> logger, IHostEnvironment env)
        {
            _context = context;
            _logger = logger;
            _env = env;
        }

        public async Task<List<ProjectResponseDto>> GetAllAsync()
        {
            try
            {
                var projects = await _context.Projects
                    .Include(p => p.Category)
                    .OrderByDescending(p => p.CreatedAt)
                    .Select(p => new ProjectResponseDto
                    {
                        Id = p.Id,
                        Title = p.Title,
                        TitleAr = p.TitleAr,                          
                        Description = p.Description,
                        DescriptionAr = p.DescriptionAr,              
                        ImageUrl = p.ImageUrl,
                        CreatedAt = p.CreatedAt,
                        IsActive = p.IsActive,
                        CategoryName = p.Category.Name
                    })

                    .ToListAsync();

                return projects;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving projects");
                return new List<ProjectResponseDto>();
            }
        }

        public async Task<ProjectResponseDto?> GetByIdAsync(int id)
        {
            try
            {
                var project = await _context.Projects
                    .Include(p => p.Category)
                    .Where(p => p.Id == id)
                   .Select(p => new ProjectResponseDto
                   {
                       Id = p.Id,
                       Title = p.Title,
                       TitleAr = p.TitleAr,
                       Description = p.Description,
                       DescriptionAr = p.DescriptionAr,
                       ImageUrl = p.ImageUrl,
                       CreatedAt = p.CreatedAt,
                       IsActive = p.IsActive,
                       CategoryName = p.Category.Name
                   })

                    .FirstOrDefaultAsync();

                return project;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error retrieving project with ID {id}");
                return null;
            }
        }

        public async Task<bool> CreateAsync(ProjectDto dto)
        {
            try
            {
                if (!_context.Categories.Any(c => c.Id == dto.CategoryId))
                {
                    _logger.LogWarning("Invalid category ID: {CategoryId}", dto.CategoryId);
                    return false;
                }

                string? imageUrl = null;

                if (dto.Image != null)
                {
                    // **[MODIFIED]**: Unify save path to be wwwroot/uploads/projects
                    var uploadDir = Path.Combine(_env.ContentRootPath, "wwwroot", "uploads", "projects");
                    Directory.CreateDirectory(uploadDir);

                    var fileName = $"{Guid.NewGuid()}_{dto.Image.FileName}";
                    var filePath = Path.Combine(uploadDir, fileName);

                    using var stream = new FileStream(filePath, FileMode.Create);
                    await dto.Image.CopyToAsync(stream);

                    // **[MODIFIED]**: Unify stored URL to match the update logic
                    imageUrl = $"/uploads/projects/{fileName}";
                }

                var project = new Project
                {
                    Title = dto.Title,
                    TitleAr = dto.TitleAr,                         
                    Description = dto.Description,
                    DescriptionAr = dto.DescriptionAr,             
                    CategoryId = dto.CategoryId,
                    IsActive = dto.IsActive,
                    ImageUrl = imageUrl,
                    CreatedAt = DateTime.UtcNow
                };


                _context.Projects.Add(project);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating project");
                return false;
            }
        }

        public async Task<bool> UpdateAsync(int id, ProjectDto dto)
        {
            try
            {
                var project = await _context.Projects.FindAsync(id);
                if (project == null) return false;

                if (!_context.Categories.Any(c => c.Id == dto.CategoryId))
                {
                    _logger.LogWarning("Invalid category ID: {CategoryId}", dto.CategoryId);
                    return false;
                }

                project.Title = dto.Title;
                project.Description = dto.Description;
                project.CategoryId = dto.CategoryId;
                project.IsActive = dto.IsActive;
              
                project.TitleAr = dto.TitleAr;                     // ✅
             
                project.DescriptionAr = dto.DescriptionAr;         // ✅


                if (dto.Image != null && dto.Image.Length > 0)
                {
                    // **[MODIFIED]**: Unify save path to be wwwroot/uploads/projects
                    var uploadDir = Path.Combine(_env.ContentRootPath, "wwwroot", "uploads", "projects");
                    Directory.CreateDirectory(uploadDir);

                    var fileName = $"{Guid.NewGuid()}_{dto.Image.FileName}";
                    var filePath = Path.Combine(uploadDir, fileName);

                    // Delete old image
                    if (!string.IsNullOrEmpty(project.ImageUrl))
                    {
                        // **[MODIFIED]**: Use the correct Path.Combine to get the full path
                        var oldImagePath = Path.Combine(_env.ContentRootPath, "wwwroot", project.ImageUrl.TrimStart('/'));
                        if (File.Exists(oldImagePath))
                        {
                            File.Delete(oldImagePath);
                        }
                    }

                    using var stream = new FileStream(filePath, FileMode.Create);
                    await dto.Image.CopyToAsync(stream);

                    // The stored URL is correct
                    project.ImageUrl = $"/uploads/projects/{fileName}";
                }

                _context.Projects.Update(project);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error updating project ID {id}");
                return false;
            }
        }

        public async Task<bool> ToggleStatusAsync(int id)
        {
            var project = await _context.Projects.FindAsync(id);
            if (project == null) return false;

            project.IsActive = !project.IsActive;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            try
            {
                var project = await _context.Projects.FindAsync(id);
                if (project == null) return false;

                _context.Projects.Remove(project);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error deleting project ID {id}");
                return false;
            }
        }
    }
}