using Google.Cloud.Firestore;

namespace InstitutoCopacabanaAPI.Models
{
    [FirestoreData]
    public class StudentModel
    {
        [FirestoreProperty]
        public string StudentId { get; set; } = string.Empty;
        [FirestoreProperty]
        public string Name { get; set; } = string.Empty;
        [FirestoreProperty]
        public List<SubjectModel> Subjects { get; set; } = new List<SubjectModel>();
    }
}
