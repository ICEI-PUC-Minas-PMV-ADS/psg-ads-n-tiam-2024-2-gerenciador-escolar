namespace InstitutoCopacabanaAPI.Services.Interfaces
{
    public interface IUserService
    {
        public Task<bool> VerifyPostEmail(string email);
        public Task<bool> VerifyPutEmail(string email, string id);
    }
}
