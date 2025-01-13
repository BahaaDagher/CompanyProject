using CompanyProject.Models;
using System.Threading.Tasks;

namespace CompanyProject.Services.Auth
{
    public interface IAuthService
    {
        Task  <AuthModel> RegisterAsync(RegisterModel model); 
        Task  <AuthModel> LoginAsync(LoginModel model);
        Task<string> AddRoleAsync(AddRoleModel model); 
     }
}
