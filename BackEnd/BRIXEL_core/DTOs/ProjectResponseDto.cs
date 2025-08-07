using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BRIXEL_core.DTOs
{
    public class ProjectResponseDto
    {
        public int Id { get; set; }

        public string Title { get; set; }
        public string? TitleAr { get; set; }

        public string Description { get; set; }
        public string? DescriptionAr { get; set; }

        public string ImageUrl { get; set; }
        public DateTime CreatedAt { get; set; }

        public string CategoryName { get; set; }
        public bool IsActive { get; set; }
    }

}
