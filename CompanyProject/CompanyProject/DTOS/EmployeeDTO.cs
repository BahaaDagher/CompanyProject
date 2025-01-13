using System.ComponentModel.DataAnnotations;

namespace CompanyProject.DTOS
{
    public class EmployeeDTO : EmployeeSimpleDTO
    {
        public int  DepartmentId { get; set; }
    }
}
