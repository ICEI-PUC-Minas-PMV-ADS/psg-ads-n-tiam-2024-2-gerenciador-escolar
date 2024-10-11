
using InstitutoCopacabanaAPI.Data;
using InstitutoCopacabanaAPI.Services.Classes;
using InstitutoCopacabanaAPI.Services.Interfaces;

namespace InstitutoCopacabanaAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddSingleton<ContextDb>();
            builder.Services.AddScoped<IUserService, UserService>(); 
            builder.Services.AddScoped<IPasswordService, PasswordService>();

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
