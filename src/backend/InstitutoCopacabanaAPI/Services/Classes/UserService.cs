using FireSharp.Interfaces;
using FireSharp.Response;
using InstitutoCopacabanaAPI.Data;
using InstitutoCopacabanaAPI.Models;
using InstitutoCopacabanaAPI.Services.Interfaces;

namespace InstitutoCopacabanaAPI.Services.Classes
{
    public class UserService : IUserService
    {
        private readonly IFirebaseClient _firebaseClient;

        public UserService(ContextDb contextDb)
        {
            _firebaseClient = contextDb.GetClient();
        }

        public async Task<bool> VerifyEmail(string email)
        {
            FirebaseResponse response = await _firebaseClient.GetAsync("users");

            var users = response.ResultAs<Dictionary<string, UserModel>>();

            if (users.Values.Any(user => user.Email == email))
                return false;

            return true;
        }
    }
}
