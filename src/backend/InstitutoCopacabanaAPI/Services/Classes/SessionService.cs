using Firebase.Auth;
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
        private readonly FirebaseAuthProvider _authConnection;

        public SessionService(ContextDb contextDb, AuthConnection authConnection)
        {
            _firebaseClient = contextDb.GetClient();
            _authConnection = authConnection.GetAuth();
        }

        public async Task<SessionModel> GetConnectedUser(string token)
        {
            var connectedUser = await _authConnection.GetUserAsync(token);            

            DocumentReference docRef = _firebaseClient.Collection("users").Document(connectedUser.LocalId);
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
