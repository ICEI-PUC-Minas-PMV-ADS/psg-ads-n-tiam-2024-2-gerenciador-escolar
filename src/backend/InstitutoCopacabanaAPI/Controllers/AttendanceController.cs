using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Google.Cloud.Firestore;
using InstitutoCopacabanaAPI.Services.Interfaces;
using InstitutoCopacabanaAPI.Models;
using InstitutoCopacabanaAPI.Data;

namespace InstitutoCopacabanaAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AttendanceController : ControllerBase
    {
        private readonly FirestoreDb _firebaseClient;
        private readonly ISessionService _sessionService;
        private readonly IClassService _classService;

        public AttendanceController(ContextDb contextDb, ISessionService sessionService, IClassService classService)
        {
            _firebaseClient = contextDb.GetClient();
            _sessionService = sessionService;
            _classService = classService;
        }

        [HttpGet("GetAttendances")]
        public async Task<ActionResult> GetAttendances(string studentName)
        {
            try
            {
                var token = HttpContext.Session.GetString("_userToken");

                if (token != null)
                {
                    var session = await _sessionService.GetConnectedUser(token);

                    if (session.UserType == "Student")
                    {
                        List<AttendanceModel> attendance = await _classService.GetAttendanceByStudentName(studentName);

                        if (attendance.Count == 0)
                            return NotFound("Não foi possível localizar as presenças do aluno.");

                        return Ok(attendance);
                    }

                    return StatusCode(403, "Este usuário não pode acessar essa funcionalidade.");
                }

                return NotFound("Nenhum usuário conectado foi encontrado.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Erro do servidor: " + ex.Message);
            }
        }


        [HttpPost("RegisterAttendance")]
        public async Task<IActionResult> RegisterAttendance(AttendanceModel attendance)
        {
            try
            {
                
                var token = HttpContext.Session.GetString("_userToken");

                if (token == null)
                {
                    return NotFound("Nenhum usuário conectado foi encontrado.");
                }

                //  sessão do usuário
                var session = await _sessionService.GetConnectedUser(token);
                if (session.UserType != "Teacher" && session.UserType != "Secretary")
                {
                    return Unauthorized("Usuário não autorizado para registrar presença.");
                }

                UserModel? student = await _classService.GetStudentByName(attendance.StudentName);

                if (student == null)
                    return NotFound("Não foi possível localizar o aluno.");

                attendance.StudentId = student.Id;

                // Valida a presença
                if (attendance == null || string.IsNullOrEmpty(attendance.StudentName))
                {
                    return BadRequest("Dados de presença inválidos.");
                }

                // Adc o usr que registrou
                attendance.RecordedBy = session.Name;

                // Ref à coleção do Firestore
                CollectionReference attendanceRef = _firebaseClient.Collection("attendance");

                // Adc ou atualiza o documento no Firestore
                await attendanceRef.Document(attendance.Id).SetAsync(attendance);

                return StatusCode(201, "Presença registrada com sucesso.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro ao registrar presença: {ex.Message}");
            }
        }
        [HttpPost("JustifyAttendance")]
        public async Task<IActionResult> JustifyAttendance(string attendanceId, [FromBody] string justification)
        {
            try
            {
                var token = HttpContext.Session.GetString("_userToken");

                if (token == null)
                {
                    return NotFound("Nenhum usuário conectado foi encontrado.");
                }

                var session = await _sessionService.GetConnectedUser(token);

                if (session.UserType != "Student")
                    return StatusCode(403, "Este usuário não pode acessar essa funcionalidade.");

                // Valida se a justificativa foi feita
                if (string.IsNullOrEmpty(justification))
                {
                    return BadRequest("A justificativa é obrigatória.");
                }

                // Ref ao Firestore
                CollectionReference attendanceRef = _firebaseClient.Collection("attendance");
                DocumentReference docRef = attendanceRef.Document(attendanceId);

                // Ve se o documento existe
                DocumentSnapshot snapshot = await docRef.GetSnapshotAsync();
                if (!snapshot.Exists)
                {
                    return NotFound("Registro de presença não encontrado.");
                }

                // Atlz a justificativa no Firestore
                Dictionary<string, object> updates = new Dictionary<string, object>
                {
                    { "Justification", justification }
                };
                await docRef.UpdateAsync(updates);

                return Ok("Falta justificada com sucesso.");
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro ao justificar falta: {ex.Message}");
            }
        }

    }
}
