using Google.Cloud.Firestore;

namespace InstitutoCopacabanaAPI.Models
{
    [FirestoreData]
    public class SubjectModel
    {
        [FirestoreProperty]
        public List<TrimesterGradeModel> Português { get; set; } = new List<TrimesterGradeModel>();
        [FirestoreProperty]
        public List<TrimesterGradeModel> Matemática { get; set; } = new List<TrimesterGradeModel>();
        [FirestoreProperty]
        public List<TrimesterGradeModel> Inglês { get; set; } = new List<TrimesterGradeModel>();
        [FirestoreProperty]
        public List<TrimesterGradeModel> História { get; set; } = new List<TrimesterGradeModel>();
        [FirestoreProperty]
        public List<TrimesterGradeModel> Geografia { get; set; } = new List<TrimesterGradeModel>();
        [FirestoreProperty]
        public List<TrimesterGradeModel> Ciências { get; set; } = new List<TrimesterGradeModel>();
        [FirestoreProperty]
        public List<TrimesterGradeModel> Artes { get; set; } = new List<TrimesterGradeModel>();
    }
}
