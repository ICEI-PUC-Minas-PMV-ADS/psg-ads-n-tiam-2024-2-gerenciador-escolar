using Google.Cloud.Firestore;

namespace InstitutoCopacabanaAPI.Models
{
    [FirestoreData]
    public class GradeModel
    {
        [FirestoreProperty]
        public string ClassId { get; set; } = string.Empty;
        [FirestoreProperty]
        public double Grade { get; set; }
    }
}
