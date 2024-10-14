using Google.Cloud.Firestore;
using InstitutoCopacabanaAPI.Data;
using InstitutoCopacabanaAPI.Enum;
using InstitutoCopacabanaAPI.Models;
using InstitutoCopacabanaAPI.Services.Interfaces;
using Microsoft.AspNetCore.Http.HttpResults;
using System.IdentityModel.Tokens.Jwt;
using System.Xml.Linq;

namespace InstitutoCopacabanaAPI.Services.Classes
{
    public class SessionService : ISessionService
    {
        private readonly FirestoreDb _firebaseClient;

        public SessionService(ContextDb contextDb)
        {
            _firebaseClient = contextDb.GetClient();
        }

        public async Task<SessionModel> GetConnectedUser(string token)
        {                     
            var handler = new JwtSecurityTokenHandler();
            var jwtToken = handler.ReadJwtToken(token);

            var userId = jwtToken.Claims.FirstOrDefault(c => c.Type == "user_id")?.Value;

            DocumentReference docRef = _firebaseClient.Collection("users").Document(userId);
            DocumentSnapshot snapshot = await docRef.GetSnapshotAsync();            

            if (snapshot.Exists)
            {
                var name = snapshot.GetValue<string>("Name");
                var email = snapshot.GetValue<string>("Email");
                var userType = snapshot.GetValue<string>("UserType");

                return new SessionModel
                {
                    Name = name,
                    Email = email,
                    UserType = userType
                };
            }

            return new SessionModel { };
        }
    }
}
