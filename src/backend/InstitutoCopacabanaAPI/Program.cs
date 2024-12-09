
using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using InstitutoCopacabanaAPI.Data;
using InstitutoCopacabanaAPI.Services.Classes;
using InstitutoCopacabanaAPI.Services.Interfaces;
using Microsoft.IdentityModel.Tokens;

namespace InstitutoCopacabanaAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {           
            var builder = WebApplication.CreateBuilder(args);

            var pathServiceKey = builder.Configuration.GetValue<string>("LinkServiceAccountKey:Path");

            FirebaseApp.Create(new AppOptions
            {
                Credential = GoogleCredential.FromFile(pathServiceKey)
            });

            // Add services to the container.
            //Serviços de sessão
            builder.Services.AddDistributedMemoryCache();
            builder.Services.AddSession(options =>
            {
                options.IdleTimeout = TimeSpan.FromMinutes(30); // Define o tempo de expiração da sessão
                options.Cookie.HttpOnly = true; // Cookie da sessão apenas acessível via HTTP (não via scripts)
                options.Cookie.IsEssential = true; // Permite o uso de sessão, mesmo que cookies não sejam obrigatórios
            });

            builder.Services.AddMvc().AddSessionStateTempDataProvider();

            //Outros serviços
            builder.Services.AddSingleton<ContextDb>();
            builder.Services.AddSingleton<AuthConnection>();
            builder.Services.AddScoped<IUserService, UserService>(); 
            builder.Services.AddScoped<IPasswordService, PasswordService>();
            builder.Services.AddScoped<ISessionService, SessionService>();
            builder.Services.AddScoped<IClassService, ClassService>();
            builder.Services.AddScoped<IGradeService, GradeService>();
        

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

            app.UseCors(options =>
            {
                options.AllowAnyOrigin();
                options.AllowAnyMethod();
                options.AllowAnyHeader();
            });

            app.UseSession();

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
