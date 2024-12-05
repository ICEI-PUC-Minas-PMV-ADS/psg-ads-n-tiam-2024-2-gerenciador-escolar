using InstitutoCopacabanaAPI.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace InstitutoCopacabanaAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GradeController : ControllerBase
    {
        private readonly ISessionService _sessionService;
        private readonly IGradeService _gradeService;
        private readonly IPdfService _pdfService;

        public GradeController(ISessionService sessionService, IGradeService gradeService, IPdfService pdfService)
        {
            _sessionService = sessionService;
            _gradeService = gradeService;
            _pdfService = pdfService;
        }

        [HttpGet("GetStudentGrade")]
        public async Task<ActionResult> GetStudentGrade(string className, string studentName, string subject)
        {
            try
            {
                var token = HttpContext.Session.GetString("_userToken");

                if (token != null)
                {
                    var session = await _sessionService.GetConnectedUser(token);

                    if (session.UserType != "Student")
                    {
                        double response = await _gradeService.GetGrade(className, studentName, subject);

                        if (response == -1)
                            return BadRequest("Essa turma não existe.");

                        if (response == -2)
                            return BadRequest("Esse aluno não existe.");

                        if (response == -3)
                            return BadRequest("Essa matéria não existe.");

                        if (response == -4)
                            return BadRequest("Nenhum aluno está matriculado nessa turma.");

                        if (response == -5)
                            return BadRequest("Não foi possível retornar a nota.");

                        return Ok(response);
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

        [HttpPut("SubmitGrade")]
        public async Task<ActionResult> SubmitGrade(string className, string studentName, string subject, double grade)
        {
            try
            {
                var token = HttpContext.Session.GetString("_userToken");

                if (token != null)
                {
                    var session = await _sessionService.GetConnectedUser(token);

                    if (session.UserType != "Student")
                    {
                        string response = await _gradeService.SubmitGrade(className, studentName, subject, grade);

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

        [HttpGet("report/{studentId}")]
        public async Task<IActionResult> GetStudentReport(int studentId, [FromQuery] bool downloadPdf = false)
        {
            try
            {
                var token = HttpContext.Session.GetString("_userToken");

                if (token == null)
                {
                    return NotFound("Nenhum usuário conectado foi encontrado.");
                }

                var session = await _sessionService.GetConnectedUser(token);

                if (session.UserType == "Student")
                {
                    return StatusCode(403, "Este usuário não pode acessar essa funcionalidade.");
                }

                // Busca os dados do rel
                var reportData = await _gradeService.GetStudentReportAsync(studentId);

                if (reportData == null)
                {
                    return NotFound(new { message = "Relatório não encontrado para o aluno especificado." });
                }

                if (downloadPdf)
                {
                    // Gera o PDF
                    var pdfBytes = _pdfService.GeneratePdf(reportData);

                    return File(pdfBytes, "application/pdf", $"Relatorio_Aluno_{studentId}.pdf");
                }

                // Retorna os dados em JSON
                return Ok(reportData);
            }
            catch (UnauthorizedAccessException)
            {
                return StatusCode(403, new { message = "Você não tem permissão para acessar este relatório." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro interno no servidor.", details = ex.Message });
            }
        }
    }
}
