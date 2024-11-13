using Firebase.Auth;
using FirebaseAdmin.Auth;
using InstitutoCopacabanaAPI.Data;
using InstitutoCopacabanaAPI.Models;
using InstitutoCopacabanaAPI.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Text;

namespace InstitutoCopacabanaAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly FirebaseAuthProvider _authConnection;
        private readonly IPasswordService _passwordService;
        private readonly ISessionService _sessionService;
        private readonly IUserService _userService;


        public LoginController(AuthConnection connection, IPasswordService passwordService, ISessionService sessionService, IUserService userService)
        {
            _authConnection = connection.GetAuth();
            _passwordService = passwordService;
            _sessionService = sessionService;
            _userService = userService;
        }


        [HttpPost("Login")]
        public async Task<IActionResult> Login(LoginModel user)
        {
            try
            {
                var fbAuthLink = await _authConnection.SignInWithEmailAndPasswordAsync(user.Email, user.Password);

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
            catch (Firebase.Auth.FirebaseAuthException)
            {
                return BadRequest("E-mail ou senha inválidos.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Erro interno do servidor: " + ex.Message);
            }
        }

        [HttpGet("GetSession")]
        public async Task<IActionResult> GetSession()
        {
            try
            {
                var token = HttpContext.Session.GetString("_userToken");

                if (token == null)
                    return BadRequest("Nenhum usuário conectado foi encontrado.");

                //var connectedUser = await _authConnection.GetUserAsync(token);

                SessionModel connectedUser = await _sessionService.GetConnectedUser(token); 

                if (connectedUser == null)
                    return NotFound("Não possível encontrar o usuário.");

                return Ok(connectedUser);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Erro interno do servidor: " + ex.Message);
            }
        }

        [HttpPost("Requestpassword")]
        public async Task<IActionResult> RequestPassword(string email)
        {          

            try
            {
                if (string.IsNullOrEmpty(email))
                {
                    return BadRequest("O e-mail é obrigatório.");
                }

                bool validEmail = await _userService.VerifyPostEmail(email);

                if (!validEmail)
                {
                    await _authConnection.SendPasswordResetEmailAsync(email);
                    return Ok("E-mail de recuperação de senha enviado com sucesso.");
                }

                return NotFound("Email não encontrado.");
                
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro ao enviar o e-mail de recuperação de senha: {ex.Message}");
            }
        }

        [HttpPost("Logout")]
        public IActionResult Logout()
        {
            try
            {
                if (HttpContext.Session.GetString("_userToken") != null)
                {
                    // Remove o token da sessão
                    HttpContext.Session.Remove("_userToken");
                    return Ok("Logout realizado com sucesso.");
                }

                return StatusCode(404, "Sessão não configurada corretamente.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Erro interno do servidor: " + ex.Message);
            }
        }

    }
}

