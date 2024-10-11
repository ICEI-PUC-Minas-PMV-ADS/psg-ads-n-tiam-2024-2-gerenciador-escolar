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

        public async Task<UserModel> PostUser(UserModel user, string hashedPassword)
        {
            UserModel finalUser = new UserModel
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                Password = hashedPassword,
                UserType = user.UserType
            };


            FirebaseResponse response = await _firebaseClient.SetAsync("users/" + user.Id, finalUser);

            return finalUser;
        }

        public async Task<UserModel> PutUser(UserModel user, string hashedPassword)
        {
            UserModel finalUser = new UserModel
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                Password = hashedPassword,
                UserType = user.UserType
            };


            FirebaseResponse response = await _firebaseClient.UpdateAsync("users/" + user.Id, finalUser);

            return finalUser;
        }

        public async Task<bool> VerifyPostEmail(string email)
        {
            FirebaseResponse response = await _firebaseClient.GetAsync("users");

            if (response.Body == "null")
                return true;

            var users = response.ResultAs<Dictionary<string, UserModel>>();

            if (users.Values.Any(user => user.Email == email))
                return false;

            return true;
        }

        public async Task<bool> VerifyPutEmail(string email, string id)
        {
            FirebaseResponse response = await _firebaseClient.GetAsync("users/" + id);
            
            var user = response.ResultAs<UserModel>();

            if (user.Email == email) 
                return true;

            if(await VerifyPostEmail(email))
                return true;

            return false;
        }
    }
}
