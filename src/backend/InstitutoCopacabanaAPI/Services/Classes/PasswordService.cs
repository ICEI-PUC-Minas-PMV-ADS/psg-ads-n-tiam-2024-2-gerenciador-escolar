using InstitutoCopacabanaAPI.Services.Interfaces;
using System.Security.Cryptography;
using System.Text.RegularExpressions;
using System.Text;

namespace InstitutoCopacabanaAPI.Services.Classes
{
    public class PasswordService : IPasswordService
    {
        public string HashPassword(string password)
        {
            using (SHA256 sha256 = SHA256.Create())
            {
                byte[] bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                StringBuilder builder = new StringBuilder();
                foreach (byte b in bytes)
                {
                    builder.Append(b.ToString("x2"));
                }
                return builder.ToString();
            }
        }

        public bool ValidatePassword(string password)
        {
            var hasMinimumLength = password.Length >= 8;
            var hasUperCase = Regex.IsMatch(password, @"[A-Z]");
            var hasLowerCase = Regex.IsMatch(password, @"[a-z]");
            var hasDigit = Regex.IsMatch(password, @"[0-9]");
            var hasSpecialChar = Regex.IsMatch(password, @"[!@#$%^&*(),.?""{}|<>]");

            return hasMinimumLength && hasUperCase && hasLowerCase && hasDigit && hasSpecialChar;
        }
    }
}
