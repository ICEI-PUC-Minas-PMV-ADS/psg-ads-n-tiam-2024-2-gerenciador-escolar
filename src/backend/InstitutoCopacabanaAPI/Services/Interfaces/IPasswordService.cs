namespace InstitutoCopacabanaAPI.Services.Interfaces
{
    public interface IPasswordService
    {
        public bool ValidatePassword(string password);
        public string HashPassword(string password);
    }
}
