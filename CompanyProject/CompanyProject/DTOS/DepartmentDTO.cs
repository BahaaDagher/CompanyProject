using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CompanyProject.DTOS
{
    public class DepartmentDTO
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public List<EmployeeSimpleDTO> Employees { get; set; }
    }
}
