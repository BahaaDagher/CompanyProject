using CompanyProject.Helpers;
using CompanyProject.Models;
using CompanyProject.Services.Auth;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CompanyProject
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        
        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<JWT>(Configuration.GetSection("JWT"));
            services.AddIdentity<ApplicationUser, IdentityRole>().AddEntityFrameworkStores<ApplicationDbContext>();
            services.AddScoped<IAuthService, AuthService>(); 

            services.AddDbContext<ApplicationDbContext>(options =>
            {
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")); 
            });
            // This sets up the application to use JWT authentication.
            services.AddAuthentication(options =>
            {
                // is the scheme used by the middleware to authenticate a user.
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                // If a user isn’t authenticated, the challenge scheme tells the app how to respond, such as prompting the user to log in or providing a 401 Unauthorized error.
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            //This configures additional settings specifically for JWT Bearer authentication.
            .AddJwtBearer(o =>
            {
                //This setting is typically used in development environments. Setting RequireHttpsMetadata to false allows the application to accept tokens sent over HTTP instead of requiring HTTPS. For production, it's recommended to set this to true for security.
                o.RequireHttpsMetadata = false;
                // By default, SaveToken determines whether the JWT token is stored in the AuthenticationProperties after it has been validated. Setting it to false means the token will not be stored by the authentication handler.
                o.SaveToken = false;
                // The TokenValidationParameters object specifies how the application will validate incoming JWT tokens. Each parameter ensures a specific aspect of the token’s validity.
                o.TokenValidationParameters = new TokenValidationParameters
                {
                    // Ensures that the token's signature is valid, preventing tampering.
                    ValidateIssuerSigningKey = true,
                    // Verifies that the issuer of the token matches the expected issuer, preventing tokens from unauthorized sources
                    ValidateIssuer = true,
                    // Checks that the token’s audience matches the intended audience, preventing tokens issued for other clients from being accepted
                    ValidateAudience = true,
                    // Validates the token’s expiration time, ensuring the token hasn’t expired. This adds a layer of security by limiting the lifespan of tokens.
                    ValidateLifetime = true,
                    ValidIssuer = Configuration["JWT:Issuer"],
                    ValidAudience = Configuration["JWT:Audience"],
                    // SymmetricSecurityKey class. A symmetric key is used here, meaning the same key is used for both signing and validating tokens.
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["JWT:Key"]))
                };
            });
            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "CompanyProject", Version = "v1" });
            });
            services.AddCors(); 
        }
        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "CompanyProject v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors(c=>c.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());

            app.UseAuthentication();  //  Are you allowed to access the application?
            app.UseAuthorization();   

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
