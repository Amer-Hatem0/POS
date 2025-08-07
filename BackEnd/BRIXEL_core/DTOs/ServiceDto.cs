using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BRIXEL_core.DTOs
{
    public class ServiceDto
    {
        public string? Title { get; set; }
        public string? Description { get; set; }
        public IFormFile? Icon { get; set; }      
        public string? IconUrl { get; set; }
        public int CategoryId { get; set; }
        public string? TitleAr { get; set; }
        public string? DescriptionAr { get; set; }
    }
}
