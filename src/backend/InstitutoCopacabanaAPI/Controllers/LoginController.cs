using Firebase.Auth;
using InstitutoCopacabanaAPI.Data;
using InstitutoCopacabanaAPI.Models;
using InstitutoCopacabanaAPI.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace InstitutoCopacabanaAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly FirebaseAuthProvider _authConnection;
        private readonly IPasswordService _passwordService; 
        private readonly ISessionService _sessionService;


        public LoginController(AuthConnection connection, IPasswordService passwordService, ISessionService sessionService)
        {
            _authConnection = connection.GetAuth();
            _passwordService = passwordService;
            _sessionService = sessionService;
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

                if (HttpContext.Session == null)
                {
                    return StatusCode(500, "Sessão não configurada corretamente.");
                }

                HttpContext.Session.SetString("_userToken", token);

                return Ok("Usuário logado com sucesso.");

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

        [HttpGet]
        public async Task<IActionResult> GetSession()
        {
            try
            {
                var token = HttpContext.Session.GetString("_userToken");

                if (token == null)
                    return BadRequest("Nenhum usuário conectado foi encontrado.");

                SessionModel sessionUser = await _sessionService.GetConnectedUser(token);

                if (sessionUser == null)
                    return NotFound("Não possível encontrar o usuário.");

                return Ok(sessionUser);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Erro interno do servidor: " + ex.Message);
            }
            
        }
          [HttpPost("logout")]
        public IActionResult Logout()
        {
            try
            {
                if (HttpContext.Session != null)
                {
                    // Remove o token da sessão
                    HttpContext.Session.Remove("_userToken");
                    return Ok("Logout realizado com sucesso.");
                }

                return StatusCode(500, "Sessão não configurada corretamente.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Erro interno do servidor: " + ex.Message);
            }
        }

    }
}
