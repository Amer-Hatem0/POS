using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BRIXEL_core.DTOs
{
    public class AdvertisementDto
    {
        public string Title { get; set; }
        public string? TitleAr { get; set; }           

        public string Content { get; set; }
        public string? ContentAr { get; set; }
        public bool IsPublished { get; set; }

        public DateTime? ExpirationDate { get; set; } 

        public IFormFile? Image { get; set; }
        public string? ImageUrl { get; set; }
        public int? CategoryId { get; set; }
        

        public List<IFormFile>? MediaFiles { get; set; }  
    }

}
