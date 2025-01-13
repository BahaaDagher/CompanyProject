using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CompanyProject.Models
{
    public class Project
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public List<Employee_Project> Employees_Projects { get; set; }
    }
}
