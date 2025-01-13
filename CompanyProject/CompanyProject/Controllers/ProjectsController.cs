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
    public class ProjectsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public ProjectsController(ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllAsync()
        {
            var projects = await _context.Projects.ToListAsync();
            return Ok(projects);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetByIdAsync(int id)
        {
            var project = await _context.Projects.Include(e => e.Employees_Projects)
                                    .Select(e => new ProjectDTO
                                    {
                                        Id = e.Id ,  
                                        Name = e.Name
                                    })
                                    .FirstOrDefaultAsync(e => e.Id == id);
            if (project == null)
                return BadRequest("invalid Employee Id");
            return Ok(project);
        }
        [HttpPost]
        public async Task<IActionResult> CreateAsync(ProgectSimpleDTO dto)
        {
            var project = new Project() { Name = dto.Name };
            await _context.Projects.AddAsync(project);
            await _context.SaveChangesAsync();
            return Ok(project);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAsync(int id, [FromBody] ProgectSimpleDTO dto)
        {
            var project = await _context.Projects.FirstOrDefaultAsync(d => d.Id == id);
            if (project == null)
                return BadRequest("invalid Project Id");
            project.Name = dto.Name;
            await _context.SaveChangesAsync();
            return Ok(project);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var project = await _context.Projects.FirstOrDefaultAsync(d => d.Id == id);
            if (project == null)
                return BadRequest("invalid Project Id");
            _context.Projects.Remove(project);
            await _context.SaveChangesAsync();
            return Ok(project);
        }
    }
}
