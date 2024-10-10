namespace InstitutoCopacabanaAPI.Services.Interfaces
{
    public interface IUserService
    {
        public Task<bool> VerifyEmail(string email);
    }
}
