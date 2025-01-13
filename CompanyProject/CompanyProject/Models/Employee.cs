using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CompanyProject.Models
{
    [Index(nameof(SSN), IsUnique = true)]
    public class Employee
    {
        public int Id { get; set; }

        [Required]
        [RegularExpression(@"^\d{14}$", ErrorMessage = "SSN must be exactly 14 digits.")]
        public string SSN { get; set; }

        [Required] 
        public string Name { get; set; }

        [Required]
        [Range(0.01, double.MaxValue, ErrorMessage = "Salary must be a positive number.")]
        public double Salary { get; set; }
        [Required]
        [ForeignKey("Department")]
        public int DepartmentId { get; set; }
        public Department Department { get; set; }
        public List<Employee_Project> Employees_Projects { get; set; }
    }
}
