using GerenciadorEscolarAPI.Models;

namespace GerenciadorEscolarAPI.Services.Interface
{
    public interface IUserService
    {
        public Task<bool> VerifyEmail(string email);
    }
}
