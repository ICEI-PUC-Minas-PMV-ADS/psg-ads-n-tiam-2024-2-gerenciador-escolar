using Google.Cloud.Firestore;

namespace InstitutoCopacabanaAPI.Models
{
    [FirestoreData]
    public class ClassModel
    {
        [FirestoreProperty]
        public string Id { get; set; } = string.Empty;
        [FirestoreProperty]
        public string Name { get; set; } = string.Empty;
        [FirestoreProperty]
        public List<StudentModel>? Students { get; set; } = new List<StudentModel>();
    }
}
