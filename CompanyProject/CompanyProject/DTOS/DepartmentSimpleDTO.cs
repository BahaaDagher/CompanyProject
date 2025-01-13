using System.ComponentModel.DataAnnotations;

namespace CompanyProject.DTOS
{
    public class DepartmentSimpleDTO
    {
        [Required]
        public string Name { get; set; }
    }
}
