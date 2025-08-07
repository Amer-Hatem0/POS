using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BRIXEL_core.Models
{
    public class Service
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? IconUrl { get; set; }

        public int CategoryId { get; set; }
        public Category Category { get; set; }  

        public DateTime? CreatedAt { get; set; }
        public bool IsVisible { get; set; } = true;

        public string? TitleAr { get; set; }         
        public string? DescriptionAr { get; set; }
    }

}
