using System.ComponentModel.DataAnnotations;

namespace CompanyProject.DTOS
{
    public class ProjectDTO
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }    
    }
}
