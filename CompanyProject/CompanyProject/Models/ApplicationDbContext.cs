using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace CompanyProject.Models
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Employee_Project>().HasKey(ep => new
            {
                ep.EmployeeId,
                ep.ProjectId
            });

            modelBuilder.Entity<Employee_Project>().HasOne(m => m.Employee).WithMany(am => am.Employees_Projects).HasForeignKey(m => m.EmployeeId);
            modelBuilder.Entity<Employee_Project>().HasOne(m => m.Project).WithMany(am => am.Employees_Projects).HasForeignKey(m => m.ProjectId);


            base.OnModelCreating(modelBuilder);
        }
        public DbSet<Department> Departments { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Project> Projects  { get; set; }
        public DbSet<Employee_Project> Employees_Projects { get; set; }


    }
}
