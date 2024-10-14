using InstitutoCopacabanaAPI.Models;

namespace InstitutoCopacabanaAPI.Services.Interfaces
{
    public interface ISessionService
    {
        public Task<SessionModel> GetConnectedUser(string token);
    }
}
