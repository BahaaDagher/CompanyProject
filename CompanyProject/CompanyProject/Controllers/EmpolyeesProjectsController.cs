using CompanyProject.DTOS;
using CompanyProject.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace CompanyProject.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class EmpolyeesProjectsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public EmpolyeesProjectsController(ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpGet] 
        public async Task <IActionResult> GetAll() {
            var employees_projects = await _context.Employees_Projects.ToListAsync();
            return Ok(employees_projects);
        }
        [HttpGet("employee/{id}")]
        public async Task<IActionResult> GetProjectsByEmployeeId(int id)
        {
            var projects = await _context.Employees_Projects
                .Where(ep => ep.EmployeeId == id)
                .Include(ep => ep.Project)
                .Select(ep => new ProjectDTO
                {
                    Id  = ep.ProjectId  , 
                    Name = ep.Project.Name 
                }).ToListAsync();

           

            return Ok(projects);
        }
        [HttpGet("project/{id}")]
        public async Task<IActionResult> GetEmployeesByProjectId(int id)
        {
            var employees = await _context.Employees_Projects
                .Where(ep => ep.ProjectId == id)
                .Include(ep => ep.Employee)
                .Select(ep => new EmployeeDTO
                {
                    Id = ep.EmployeeId , 
                    Name = ep.Employee.Name , 
                    Salary = ep.Employee.Salary ,
                    DepartmentId = ep.Employee.DepartmentId ,
                    SSN = ep.Employee.SSN ,
                }).ToListAsync();

            

            return Ok(employees);
        }
        [HttpPost]
        public async Task<IActionResult> CreateEmployeeProject(EmployeesProjectsDTO employeeProject)
        {
            var employee = await _context.Employees.FirstOrDefaultAsync(e => e.Id == employeeProject.EmployeeId); 
            if (employee == null) return NotFound("can't find this employee..." ); 
            var project  = await _context.Projects.FirstOrDefaultAsync(p => p.Id == employeeProject.ProjectId); 
            if (project == null) return NotFound("can't find this project..." ); 
            
            if (_context.Employees_Projects.Any(ep => ep.EmployeeId == employeeProject.EmployeeId && ep.ProjectId == employeeProject.ProjectId))
            {
                return Conflict("This association already exists.");
            }
            var employee_project = new Employee_Project { EmployeeId = employeeProject.EmployeeId  , ProjectId = employeeProject.ProjectId }; 
            _context.Employees_Projects.Add(employee_project);
            await _context.SaveChangesAsync();

            return Ok(employeeProject);
        }
        [HttpPut("{employeeId}/{projectId}")]
        public async Task<IActionResult> UpdateEmployeeProject(int employeeId, int projectId, EmployeesProjectsDTO updatedAssociation)
        {
            var employeeProject = await _context.Employees_Projects
                .FirstOrDefaultAsync(ep => ep.EmployeeId == employeeId && ep.ProjectId == projectId);

            if (employeeProject == null)
            {
                return NotFound("The specified association was not found.");
            }

            var employee = await _context.Employees.FirstOrDefaultAsync(e => e.Id == updatedAssociation.EmployeeId);
            if (employee == null)
                return NotFound("Can't find this employee.");

            var project = await _context.Projects.FirstOrDefaultAsync(p => p.Id == updatedAssociation.ProjectId);
            if (project == null)
                return NotFound("Can't find this project.");

            _context.Employees_Projects.Remove(employeeProject);

    

            await CreateEmployeeProject(updatedAssociation);


            return Ok(updatedAssociation);
        }

        [HttpDelete("{employeeId}/{projectId}")]
        public async Task<IActionResult> DeleteEmployeeProject(int employeeId, int projectId)
        {
            var employeeProject = await _context.Employees_Projects
                .FirstOrDefaultAsync(ep => ep.EmployeeId == employeeId && ep.ProjectId == projectId);

            if (employeeProject == null)
            {
                return NotFound("The specified association was not found.");
            }

            _context.Employees_Projects.Remove(employeeProject);
            await _context.SaveChangesAsync();

            return Ok(employeeProject);
        }

    }
}
