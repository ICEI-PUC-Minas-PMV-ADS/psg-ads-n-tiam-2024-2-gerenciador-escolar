using Firebase.Auth;
using Google.Cloud.Firestore;
using InstitutoCopacabanaAPI.Data;
using InstitutoCopacabanaAPI.Models;
using InstitutoCopacabanaAPI.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace InstitutoCopacabanaAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClassController : ControllerBase
    {
        private readonly FirestoreDb _fireaseClient;
        private readonly ISessionService _sessionService;
        private readonly IClassService _classService;

        public ClassController(ContextDb contextDb, ISessionService sessionService, IClassService classService) 
        {
            _fireaseClient = contextDb.GetClient();
            _sessionService = sessionService;
            _classService = classService;
        }

        [HttpGet("GetClasses")]
        public async Task<ActionResult> GetClasses()
        {
            try
            {
                if (HttpContext.Session.GetString("_userToken") != null)
                {
                    CollectionReference classesRef = _fireaseClient.Collection("classes");

                    QuerySnapshot snapshot = await classesRef.GetSnapshotAsync();

                    if (snapshot.Count == 0)
                        return NotFound("Nenhuma classe foi encontrada.");

                    List<ClassModel> classesList = new List<ClassModel>();

                    foreach (DocumentSnapshot document in snapshot.Documents)
                    {
                        ClassModel schoolClass = document.ConvertTo<ClassModel>();
                        classesList.Add(schoolClass);
                    }

                    return StatusCode(200, classesList);
                }

                return NotFound("Nenhum usuário conectado foi encontrado.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Erro interno do servidor: " + ex.Message);
            }
        }

        [HttpPost("CreateClass")]
        public async Task<ActionResult> CreateClass(ClassModel schoolClass)
        {
            try
            {
                var token = HttpContext.Session.GetString("_userToken");

                if (token != null)
                {
                    var session = await _sessionService.GetConnectedUser(token);

                    if (session.UserType == "Secretary")
                    {
                        if (!ModelState.IsValid)
                            return BadRequest("Todos os campos são obrigatórios.");

                        string IdGenerate = Guid.NewGuid().ToString("N");

                        schoolClass.Id = IdGenerate;

                        var finalClass = await _classService.CreateClass(schoolClass);

                        return StatusCode(201, finalClass);
                    }

                    return Unauthorized("Este usuário não pode acessar essa funcionalidade.");
                }

                return NotFound("Nenhum usuário conectado foi encontrado.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Erro interno do servidor: " + ex.Message);
            }
        }
        
    }
}
