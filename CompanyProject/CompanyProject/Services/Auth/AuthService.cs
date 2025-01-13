using CompanyProject.Helpers;
using CompanyProject.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.Extensions.Options;

namespace CompanyProject.Services.Auth
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly JWT _jwt;
        public AuthService (UserManager<ApplicationUser> userManager , RoleManager<IdentityRole> roleManager, IOptions<JWT> jwt)
        {
            _userManager = userManager ;
            _jwt = jwt.Value;
            _roleManager = roleManager ;
        }
        public async Task<AuthModel>  RegisterAsync(RegisterModel model)
        {
            if (await _userManager.FindByEmailAsync(model.Email) is not null ) 
                return new AuthModel { Message = "Email is already registerd"}; 
            
            if (await _userManager.FindByNameAsync(model.UserName) is not null)
                return new AuthModel { Message = "UserName is already registerd" };

            var user = new ApplicationUser
            { 
                UserName = model.UserName , 
                Email = model.Email ,   
                FirstName = model.FirstName , 
                LastName = model.LastName ,
            };

            //IdentityResult result = await _userManager.CreateAsync(user, model.Password); 
            var result = await _userManager.CreateAsync(user, model.Password);
            if(!result.Succeeded)
            {
                string errors = ""; 
                foreach(var error in result.Errors)
                {
                    errors+= $"{error.Description} , "; 
                }
                return new AuthModel { Message = errors };
            }
            await _userManager.AddToRoleAsync(user , "User" );
            var JwtSecurityToken = await CreateJwtToken(user);
            return new AuthModel 
            {
                Message = "Register Succeeded", 
                Email = model.Email,
                UserName = model.UserName,
                IsAuthenticated = true,
                ExpiresOn = JwtSecurityToken.ValidTo,
                Roles = new List<string> { "User" },
                Token = new JwtSecurityTokenHandler().WriteToken(JwtSecurityToken),
            };

        }
        public async Task<AuthModel> LoginAsync(LoginModel model)
        {
            var authModel = new AuthModel(); 
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null  || ! await _userManager.CheckPasswordAsync(user ,model.Password))
            {
                authModel.Message = "Email or Password incorrect!";
                return authModel;
            }
            var JwtSecurityToken = await CreateJwtToken(user);
            var rolesList = await _userManager.GetRolesAsync(user); 
            
            authModel.Message = "Login Succeeded";
            authModel.Email = model.Email;
            authModel.UserName = user.UserName; 
            authModel.IsAuthenticated = true;
            authModel.Token = new JwtSecurityTokenHandler().WriteToken(JwtSecurityToken); 
            authModel.ExpiresOn = JwtSecurityToken.ValidTo;
            
            authModel.Roles = rolesList.ToList(); 
            
            return authModel;
            

        }
        public async Task<string> AddRoleAsync(AddRoleModel model)
        {
            var user = await _userManager.FindByIdAsync(model.UserId);
            var role = await _roleManager.FindByIdAsync(model.RoleId);
            if (user == null || role == null)
                return "invalid user or Role";
            if (await _userManager.IsInRoleAsync(user, role.Name))
                return "user already assigned to this role";

            var result = await _userManager.AddToRoleAsync(user, role.Name);
            if (result.Succeeded)
            {
                return string.Empty;
            }
            else return "Somthing went wrong"; 


        }
        private async Task<JwtSecurityToken> CreateJwtToken(ApplicationUser user)
        {
            var userClaims = await _userManager.GetClaimsAsync(user);
            var roles = await _userManager.GetRolesAsync(user);
            var roleClaims = new List<Claim>();

            foreach (var role in roles)
                roleClaims.Add(new Claim("roles", role));

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim("uid", user.Id) // custome value 
            }
            .Union(userClaims)
            .Union(roleClaims);

            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwt.Key));
            var signingCredentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256);

            var jwtSecurityToken = new JwtSecurityToken(
                    issuer: _jwt.Issuer,
                    audience: _jwt.Audience,
                    claims: claims,
                    expires: DateTime.Now.AddDays(_jwt.DurationInDays),
                    signingCredentials: signingCredentials
                );

            return jwtSecurityToken;
        }
    }
}
