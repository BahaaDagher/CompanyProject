using CompanyProject.DTOS;
using CompanyProject.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace CompanyProject.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public DepartmentsController(ApplicationDbContext context )
        {
            _context = context; 
        }
        [HttpGet]
        public async Task<IActionResult> GetAllAsync()
        {
            var departments = await _context.Departments
                .Include(d => d.Employees)  // Include related Employees
                .Select(d => new DepartmentDTO
                {
                    Id = d.Id,
                    Name = d.Name,
                    Employees = d.Employees.Select(e => new EmployeeSimpleDTO
                    {
                        Id = e.Id,
                        Name = e.Name,
                        SSN = e.SSN,
                        Salary = e.Salary,
                    }).ToList()
                })
                .ToListAsync();

            return Ok(departments);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetByIdAsync(int id)
        {
            var department = await _context.Departments.Include(e => e.Employees)
                                    .Select(e => new DepartmentDTO
                                    {
                                        Id = e.Id,
                                        Name = e.Name,
                                        Employees = e.Employees.Select(e => new EmployeeSimpleDTO
                                        {
                                            Id= e.Id,
                                            Name = e.Name,
                                            SSN = e.SSN,
                                            Salary = e.Salary,
                                        }).ToList()
                                    })
                                    .FirstOrDefaultAsync(e => e.Id == id);
            if (department == null)
                return BadRequest("invalid Employee Id");
            return Ok(department);
        }
        [HttpPost]
        public async Task<IActionResult> CreateAsync(DepartmentSimpleDTO dto)
        {
            var department = new Department() { Name = dto.Name };
            await _context.Departments.AddAsync(department);
            await _context.SaveChangesAsync();
            return Ok(department);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAsync(int id , [FromBody] DepartmentSimpleDTO dto)
        {
            var department = await _context.Departments.FirstOrDefaultAsync(d=>d.Id == id );
            if (department == null)
                return BadRequest("invalid Department Id");
            department.Name = dto.Name; 
            await _context.SaveChangesAsync(); 
            return Ok(department);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var department = await _context.Departments.FirstOrDefaultAsync(d => d.Id == id);
            if (department == null)
                return BadRequest("invalid Department Id");
            _context.Departments.Remove(department); 
            await _context.SaveChangesAsync();
            return Ok(department);
        }
    }
}
