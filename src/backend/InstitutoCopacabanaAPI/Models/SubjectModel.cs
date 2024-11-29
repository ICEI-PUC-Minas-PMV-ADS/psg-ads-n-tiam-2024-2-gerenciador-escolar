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

        public SubjectModel()
        {
            var defaultGrades = new List<TrimesterGradeModel>
            {
                new TrimesterGradeModel { Grade = 0, Attendance = 0},
            };

            Português = new List<TrimesterGradeModel>(defaultGrades);
            Matemática = new List<TrimesterGradeModel>(defaultGrades);
            Inglês = new List<TrimesterGradeModel>(defaultGrades);
            História = new List<TrimesterGradeModel>(defaultGrades);
            Geografia = new List<TrimesterGradeModel>(defaultGrades);
            Ciências = new List<TrimesterGradeModel>(defaultGrades);
            Artes = new List<TrimesterGradeModel>(defaultGrades);
        }
    }
}
