using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BRIXEL_core.DTOs
{
    public class AdvertisementResponseDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public string? TitleAr { get; set; }         

    
        public string? ContentAr { get; set; }
        public string? ImageUrl { get; set; }
        public bool IsPublished { get; set; }
        public DateTime? ExpirationDate { get; set; }
        public string? CreatedById { get; set; }
        public DateTime CreatedAt { get; set; }
        public int? CategoryId { get; set; }
        public string? CategoryName { get; set; }
        public List<string> MediaUrls { get; set; } = new();  
    }

}
