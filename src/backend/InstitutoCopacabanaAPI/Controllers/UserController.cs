using Google.Cloud.Firestore;
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
        private readonly FirestoreDb _firebaseClient;
        private readonly IUserService _userService;
        private readonly IPasswordService _passwordService;

        public UserController(ContextDb contextDb, IUserService userService, IPasswordService passwordService)
        {
            _firebaseClient = contextDb.GetClient();
            _userService = userService;
            _passwordService = passwordService;
        }

        [HttpGet]
        public async Task<ActionResult> GetUsers()
        {
            try
            {
                CollectionReference usersRef = _firebaseClient.Collection("users");

                QuerySnapshot snapshot = await usersRef.GetSnapshotAsync();

                if (snapshot.Count() == 0) 
                    return NotFound("Nenhum usuário foi encontrado.");

                List<UserModel> usersList = new List<UserModel>();

                foreach (DocumentSnapshot document in snapshot.Documents)
                {
                    UserModel user = document.ConvertTo<UserModel>();
                    usersList.Add(user);
                }

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
                DocumentReference docRef = _firebaseClient.Collection("users").Document(id);
                DocumentSnapshot snapshot = await docRef.GetSnapshotAsync();

                if (!snapshot.Exists)
                {
                    return NotFound("Nenhum usuário com esse Id foi encontrado.");
                }

                Dictionary<string, object> user = snapshot.ToDictionary();

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
                    if (!_passwordService.ValidatePassword(user.Password))
                        return BadRequest("A senha não atende os padrões.");

                    string hashedPassword = _passwordService.HashPassword(user.Password);

                    var finalUser = await _userService.PostUser(user, hashedPassword);

                    return Ok(finalUser);
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

                    if (!_passwordService.ValidatePassword(user.Password))
                        return BadRequest("A senha não atende os padrões.");

                    string hashedPassword = _passwordService.HashPassword(user.Password);

                    var finalUser = await _userService.PutUser(user, hashedPassword);                    
                    
                    return Ok(finalUser);
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
                DocumentReference docRef = _firebaseClient.Collection("users").Document(id);

                DocumentSnapshot snapshot = await docRef.GetSnapshotAsync();

                if (!snapshot.Exists)
                    return NotFound("Usuário não encontrado.");

                await docRef.DeleteAsync();

                snapshot = await docRef.GetSnapshotAsync();
                if (snapshot.Exists)
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
