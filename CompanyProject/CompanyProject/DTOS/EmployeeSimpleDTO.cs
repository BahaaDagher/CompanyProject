using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace CompanyProject.DTOS
{
    [Index(nameof(SSN), IsUnique = true)]
    public class EmployeeSimpleDTO
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
    }
}
