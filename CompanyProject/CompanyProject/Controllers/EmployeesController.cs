using CompanyProject.DTOS;
using CompanyProject.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Runtime.Intrinsics.X86;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace CompanyProject.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public EmployeesController(ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllAsync()
        {
            var employees = await _context.Employees
                                    .Include(e=>e.Department)
                                    .Select(e=> new EmployeeDTO
                                    {
                                        Id = e.Id , 
                                        Name = e.Name , 
                                        SSN = e.SSN ,
                                        Salary = e.Salary , 
                                        DepartmentId  = e.Department.Id ,
                                    })
                                    .ToListAsync();
            return Ok(employees);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetByIdAsync(int id)
        {
            var employee = await _context.Employees.Include(e => e.Department)
                                    .Select(e => new EmployeeDTO
                                    {
                                        Id = e.Id,
                                        Name = e.Name,
                                        SSN = e.SSN,
                                        Salary = e.Salary,
                                        DepartmentId = e.Department.Id,
                                    })
                                    .FirstOrDefaultAsync(e=>e.Id== id);
            if (employee == null)
                return BadRequest("invalid Employee Id"); 
            return Ok(employee);
        }
        [HttpGet("getByDepartmentId")]
        public async Task<IActionResult> GetByDepartmentId(int departmentId)
        {
            var employees = await _context.Employees
                                          .Where(e => e.DepartmentId == departmentId)
                                          .Select(e => new EmployeeDTO
                                          {
                                              Id = e.Id,
                                              Name = e.Name,
                                              SSN = e.SSN,
                                              Salary = e.Salary,
                                              DepartmentId = e.Department.Id,
                                          })
                                          .ToListAsync();

            if (employees == null )
                return NotFound("No employees found for the specified department ID.");

            return Ok(employees);
        }
        [HttpPost]
        public async Task<IActionResult> CreateAsync(EmployeeDTO dto)
        {
            var Dept = _context.Departments.FirstOrDefault(d => d.Id == dto.DepartmentId);
            if (Dept == null)
            {
                return NotFound("invalid Dept Id");
            }
            var existingEmployee = await _context.Employees.FirstOrDefaultAsync(e => e.SSN == dto.SSN);
            if (existingEmployee != null)
            {
                return BadRequest($"An employee with SSN {dto.SSN} already exists.");
            }
            var employee = new Employee() 
            {
                SSN = dto.SSN ,
                Name = dto.Name ,
                Salary = dto.Salary ,
                DepartmentId = dto.DepartmentId
            };
            await _context.Employees.AddAsync(employee);
            await _context.SaveChangesAsync();

            dto.Id = employee.Id;
            return Ok(dto);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAsync(int id, [FromBody] EmployeeDTO dto)
        {
            var Dept = _context.Departments.FirstOrDefault(d => d.Id == dto.DepartmentId);
            if (Dept == null)
            {
                return NotFound("invalid Dept Id");
            }
            var existingEmployee = await _context.Employees.FirstOrDefaultAsync(e => e.SSN == dto.SSN && e.Id != id);
            if (existingEmployee != null)
            {
                return BadRequest($"An employee with SSN {dto.SSN} already exists.");
            }

            var employee = await _context.Employees.FirstOrDefaultAsync(d => d.Id == id);
            if (employee == null)
                return BadRequest("invalid Employee Id");
            employee.SSN = dto.SSN;
            employee.Name = dto.Name;
            employee.Salary = dto.Salary;
            await _context.SaveChangesAsync();

            dto.Id = employee.Id; 
            return Ok(dto);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var employee = await _context.Employees.FirstOrDefaultAsync(d => d.Id == id);
            if (employee == null)
                return BadRequest("invalid Employee Id");
            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();
            return Ok(employee);
        }
    }
}
