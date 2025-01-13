using CompanyProject.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace CompanyProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public UsersController(ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _context.Users.ToListAsync();
            return Ok(users);
        }
        
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(string id )
        {
            var user = await _context.Users.FindAsync(id); 
            if(user == null) 
                return NotFound("");
            _context.Users.Remove(user);    
            _context.SaveChanges();
            return Ok(user);
        }
    }
}
