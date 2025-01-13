using System.ComponentModel.DataAnnotations;

namespace CompanyProject.Models
{
    public class AddRoleModel
    {
        [Required]
        public string UserId{ get; set; }
        [Required]
        public string RoleId { get; set; }   
    }
}
