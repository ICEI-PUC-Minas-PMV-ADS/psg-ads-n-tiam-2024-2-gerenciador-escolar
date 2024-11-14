using Google.Cloud.Firestore;

namespace InstitutoCopacabanaAPI.Models
{
    [FirestoreData]
    public class TrimesterGradeModel
    {
        [FirestoreProperty]
        public double? Grade { get; set; }
        [FirestoreProperty]
        public double? Attendance { get; set; }
    }
}
