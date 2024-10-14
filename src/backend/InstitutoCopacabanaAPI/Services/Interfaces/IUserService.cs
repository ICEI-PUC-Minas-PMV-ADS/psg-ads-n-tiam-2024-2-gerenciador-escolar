using InstitutoCopacabanaAPI.Models;

namespace InstitutoCopacabanaAPI.Services.Interfaces
{
    public interface IUserService
    {
        public Task<UserModel> PostUser(UserModel user, string hashedPassword);
        public Task<UserModel> PutUser(UserModel user, string hashedPassword);
        public Task<bool> VerifyPostEmail(string email);
        public Task<bool> VerifyPutEmail(string email, string id);
        //public Task CreateAuthenticantion(UserModel user);
    }
}
