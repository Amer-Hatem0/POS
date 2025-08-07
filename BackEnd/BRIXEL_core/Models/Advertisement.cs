using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BRIXEL_core.Models
{
    public class Advertisement
    {
        public int Id { get; set; }

        public string Title { get; set; }
        public string? TitleAr { get; set; }        

        public string Content { get; set; }
        public string? ContentAr { get; set; }
        public string? ImageUrl { get; set; }
        public bool IsPublished { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime? ExpirationDate { get; set; }  

        public string? CreatedById { get; set; } // FK
        public ApplicationUser? CreatedBy { get; set; }


        public int? CategoryId { get; set; }
        public Category? Category { get; set; }

       
        public List<MediaFile> MediaFiles { get; set; } = new();

    }


}
