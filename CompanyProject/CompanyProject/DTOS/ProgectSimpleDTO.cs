using System.ComponentModel.DataAnnotations;

namespace CompanyProject.DTOS
{
    public class ProgectSimpleDTO
    {
        [Required]
        public string Name { get; set; }
    }
}
