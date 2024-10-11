using FireSharp.Interfaces;
using FireSharp.Response;
using InstitutoCopacabanaAPI.Data;
using InstitutoCopacabanaAPI.Models;
using InstitutoCopacabanaAPI.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace InstitutoCopacabanaAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IFirebaseClient _firebaseClient;
        private readonly IUserService _userService;

        public UserController(ContextDb contextDb, IUserService userService)
        {
            _firebaseClient = contextDb.GetClient();
            _userService = userService;
        }

        [HttpGet]
        public async Task<ActionResult> GetUsers()
        {
            try
            {
                FirebaseResponse response = await _firebaseClient.GetAsync("users");

                if (response.Body == "null") 
                    return NotFound("Nenhum usuário foi encontrado.");

                var userDictonary = response.ResultAs<Dictionary<string, UserModel>>();

                var usersList = userDictonary.Values.ToList();

                return Ok(usersList);

            }
            catch (Exception ex)
            {
                return StatusCode(500, "Erro interno do servidor: " + ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetUserById(string id)
        {
            try
            {
                FirebaseResponse response = await _firebaseClient.GetAsync("users/" + id);

                if (response.Body == null)
                {
                    return NotFound("Nenhum usuário com esse Id foi encontrado.");
                }

                UserModel user = response.ResultAs<UserModel>();

                return Ok(user);

            }
            catch (Exception ex)
            {
                return StatusCode(500, "Erro interno do servidor: " + ex.Message);
            }

        }

        [HttpPost]
        public async Task<ActionResult> PostUser(UserModel user)
        {
            try
            {
                if(!ModelState.IsValid) 
                    return BadRequest("Todos os campos são obrigatórios.");

                string IdGenerate = Guid.NewGuid().ToString("N");

                user.Id = IdGenerate;

                if (await _userService.VerifyPostEmail(user.Email))
                {
                    SetResponse response = await _firebaseClient.SetAsync("users/" + IdGenerate, user);
                    return Ok(user);
                }

                return Conflict("Este e-mail já está sendo utilizado.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Erro interno do servidor: " + ex.Message);
            }
        }

        [HttpPut]
        public async Task<ActionResult> UpdateUser(UserModel user)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest("Todos os campos são obrigatórios.");


                string userId = user.Id;

                if (await _userService.VerifyPutEmail(user.Email, user.Id))
                {
                    FirebaseResponse response = await _firebaseClient.UpdateAsync("users/" + userId, user);

                    return Ok(user);
                }

                return Conflict("Este e-mail já está sendo utilizado.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Erro interno do servidor: " + ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteUser(string id)
        {
            try
            {
                FirebaseResponse getUserResponse = await _firebaseClient.GetAsync("users/" + id);

                if (getUserResponse.Body == "null")
                    return NotFound("Ususário não encontrado.");

                FirebaseResponse deleteUserResponse = await _firebaseClient.DeleteAsync("users/" + id);

                FirebaseResponse checkUserResponse = await _firebaseClient.GetAsync("users/" + id);
                if (checkUserResponse.Body != "null")
                    return StatusCode(500, "Falha ao deletar o usuário.");

                return Ok("Usuário deletado com sucesso.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Erro interno do servidor: " + ex.Message);
            }
        }
    }
}
