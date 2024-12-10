using Google.Cloud.Firestore;
using InstitutoCopacabanaAPI.Enum;

namespace InstitutoCopacabanaAPI.Models
{
    [FirestoreData]
    public class UserModel
    {
        [FirestoreProperty]
        public string Id { get; set; } = string.Empty;
        [FirestoreProperty]
        public string Name { get; set; } = string.Empty;
        [FirestoreProperty]
        public string Email { get; set; } = string.Empty;
        [FirestoreProperty]
        public string Password { get; set; } = string.Empty;
        [FirestoreProperty]
        public string UserType { get; set; } = string.Empty;

        [FirestoreProperty]
        public string? ClassName { get; set; }
    }
}
