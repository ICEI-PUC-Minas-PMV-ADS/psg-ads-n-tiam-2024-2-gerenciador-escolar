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

                return Ok(response);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetUserById(string id)
        {
            try
            {
                FirebaseResponse response = await _firebaseClient.GetAsync("users/" + id);

                if (response.Body == "null")
                {
                    return NotFound("Nenhum usuário foi encontrado.");
                }

                UserModel user = response.ResultAs<UserModel>();

                return Ok(user);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpPost]
        public async Task<ActionResult> PostUser(UserModel user)
        {
            try
            {
                string IdGenerate = Guid.NewGuid().ToString("N");

                user.Id = IdGenerate;

                if (await _userService.VerifyEmail(user.Email))
                {
                    SetResponse response = await _firebaseClient.SetAsync("users/" + IdGenerate, user);
                    return Ok(user);
                }

                return BadRequest("Este e-mail já está sendo utilizado.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public async Task<ActionResult> UpdateUser(UserModel user)
        {
            try
            {
                string userId = user.Id;

                if (await _userService.VerifyEmail(user.Email))
                {
                    FirebaseResponse response = await _firebaseClient.UpdateAsync("users/" + userId, user);

                    return Ok(user);
                }

                return BadRequest("Este e-mail já está sendo utilizado.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteUser(string id)
        {
            try
            {
                await _firebaseClient.DeleteAsync("users/" + id);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
