using Firebase.Auth;
using InstitutoCopacabanaAPI.Data;
using InstitutoCopacabanaAPI.Models;
using InstitutoCopacabanaAPI.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace InstitutoCopacabanaAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly FirebaseAuthProvider _authConnection;
        private readonly IPasswordService _passwordService;


        public LoginController(AuthConnection connection, IPasswordService passwordService)
        {
            _authConnection = connection.GetAuth();
            _passwordService = passwordService;
        }


        [HttpPost]
        public async Task<IActionResult> Login(LoginModel user)
        {
            try
            {
                string hashedPassword = _passwordService.HashPassword(user.Password);

                var fbAuthLink = await _authConnection.SignInWithEmailAndPasswordAsync(user.Email, hashedPassword);

                if (fbAuthLink == null)
                {
                    return BadRequest("Erro ao fazer login.");
                }

                string token = fbAuthLink.FirebaseToken;

                return Ok(token);

            }
            catch (FirebaseAuthException)
            {
                return BadRequest("E-mail ou senha inválidos.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Erro interno do servidor: " + ex.Message);
            }
        }
    }
}
