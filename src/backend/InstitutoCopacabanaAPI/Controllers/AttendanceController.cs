using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Google.Cloud.Firestore;
using InstitutoCopacabanaAPI.Services.Interfaces;
using InstitutoCopacabanaAPI.Models;

namespace InstitutoCopacabanaAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AttendanceController : ControllerBase
    {
        private readonly ISessionService _sessionService;
        private readonly FirestoreDb _firestoreClient;

        public AttendanceController(ISessionService sessionService, FirestoreDb firestoreClient)
        {
            _sessionService = sessionService;
            _firestoreClient = firestoreClient;
        }

        [HttpPost("RegisterAttendance")]
        public async Task<IActionResult> RegisterAttendance([FromBody] AttendanceModel attendance)
        {
            try
            {
                
                var token = HttpContext.Session.GetString("_userToken");

                if (token == null)
                {
                    return Unauthorized("Usuário não autorizado para registrar presença.");
                }

                //  sessão do usuário
                var session = await _sessionService.GetConnectedUser(token);
                if (session.UserType != "Teacher" && session.UserType != "Secretary")
                {
                    return Unauthorized("Usuário não autorizado para registrar presença.");
                }

                // Valida a presença
                if (attendance == null || string.IsNullOrEmpty(attendance.StudentId))
                {
                    return BadRequest("Dados de presença inválidos.");
                }

                 attendance.IsPresent = true;
                 
                // Adc o usr que registrou
                attendance.RecordedBy = session.UserId;

                // Ref à coleção do Firestore
                CollectionReference attendanceRef = _firestoreClient.Collection("attendance");

                // Adcou atualiza o documento no Firestore
                await attendanceRef.Document(attendance.Id).SetAsync(attendance);

                return StatusCode(201, "Presença registrada com sucesso.");
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro ao registrar presença: {ex.Message}");
            }
        }
                [HttpPost("JustifyAttendance")]
        public async Task<IActionResult> JustifyAttendance(string attendanceId, [FromBody] string justification)
        {
            try
            {
                // Valida se a justificativa foi feita
                if (string.IsNullOrEmpty(justification))
                {
                    return BadRequest("A justificativa é obrigatória.");
                }

                // Refao Firestore
                CollectionReference attendanceRef = _firestoreClient.Collection("attendance");
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
