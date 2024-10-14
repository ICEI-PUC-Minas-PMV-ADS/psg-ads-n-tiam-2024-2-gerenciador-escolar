using Firebase.Auth;
using Google.Cloud.Firestore;

namespace InstitutoCopacabanaAPI.Data
{
    public class AuthConnection
    {
        private readonly FirebaseAuthProvider _auth;

        public AuthConnection(IConfiguration configuration)
        {
            var authConfig = configuration.GetSection("FirebaseAuth");

            _auth = new FirebaseAuthProvider(
                new FirebaseConfig(authConfig["API_KEY"]));
        }

        public FirebaseAuthProvider GetAuth()
        {
            return _auth;
        }
    }
}
