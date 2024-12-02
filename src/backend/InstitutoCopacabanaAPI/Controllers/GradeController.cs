using InstitutoCopacabanaAPI.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace InstitutoCopacabanaAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GradeController : ControllerBase
    {
        private readonly ISessionService _sessionService;
        private readonly IGradeService _gradeService;

        public GradeController(ISessionService sessionService, IGradeService gradeService)
        {
            _sessionService = sessionService;
            _gradeService = gradeService;
        }

        [HttpPut("SubmitGrade")]
        public async Task<ActionResult> SubmitGrade(string className, string StudentName, string subject, double grade)
        {
            try
            {
                var token = HttpContext.Session.GetString("_userToken");

                if (token != null)
                {
                    var session = await _sessionService.GetConnectedUser(token);

                    if (session.UserType != "Student")
                    {
                        string response = await _gradeService.SubmitGrade(className, StudentName, subject, grade);

                        if (response == "Success")
                            return StatusCode(201, "Nota alterada com sucesso.");

                        if (response == "NullClass")
                            return BadRequest("Essa turma não existe.");

                        if (response == "NullStudent")
                            return BadRequest("Esse aluno não existe.");

                        if (response == "FieldStudentsNull")
                            return BadRequest("Nenhum aluno está matriculado nessa turma.");

                        if (response == "FieldSubjectNull")
                            return BadRequest("O campo de máteria não existe.");

                        if (response == "StudentNotFound")
                            return NotFound("Esse aluno não está matriculado nessa turma.");

                        if (response == "SubjectNotFound")
                            return NotFound("Essa máteria não existe.");

                        if(response == "GradeInvalidFormat")
                            return NotFound("Com essa nota o aluno ultrapassa os limite de nota possíveis.");

                        if (response == "Failed")
                            return BadRequest("Não foi possível alterar a nota.");
                    }

                    return StatusCode(403, "Este usuário não pode acessar essa funcionalidade.");
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
