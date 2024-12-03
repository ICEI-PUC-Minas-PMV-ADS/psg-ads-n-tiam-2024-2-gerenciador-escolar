using Google.Cloud.Firestore;
using InstitutoCopacabanaAPI.Data;
using InstitutoCopacabanaAPI.Models;
using InstitutoCopacabanaAPI.Services.Interfaces;
using System.Runtime.InteropServices;

namespace InstitutoCopacabanaAPI.Services.Classes
{
    public class GradeService : IGradeService
    {
        public readonly IClassService _classService;
        private readonly FirestoreDb _firestoreDb;

        public GradeService(ContextDb contextDb, IClassService classService)
        {
            _firestoreDb = contextDb.GetClient();
            _classService = classService;
        }

        public async Task<double> GetGrade(string className, string studentName, string subject)
        {
            ClassModel? atualClass = await _classService.GetClassByName(className);
            if (atualClass == null)
                return -1;

            UserModel? student = await _classService.GetStudentByName(studentName);
            if (student == null)
                return -2;

            DocumentReference documentReference = _firestoreDb.Collection("classes").Document(atualClass.Id);

            DocumentSnapshot documentSnapshot = await documentReference.GetSnapshotAsync();
            if (!documentSnapshot.Exists)
                return -5;

            Dictionary<string, object> classData = documentSnapshot.ToDictionary();

            if (!classData.TryGetValue("Students", out object? studentsObj) || studentsObj is not List<object> students)
                return -4;

            var studentData = students
                .OfType<Dictionary<string, object>>()
                .FirstOrDefault(s => s["StudentId"].ToString() == student.Id);

            if (studentData == null)
                return -5;

            if (!studentData.TryGetValue("Subjects", out object? subjectsObj) || subjectsObj is not List<object> subjects)
                return -5;

            var subjectData = subjects
                .OfType<Dictionary<string, object>>()
                .FirstOrDefault(s => s.ContainsKey(subject));

            if (subjectData == null)
                return -3;

            var grades = subjectData[subject] as List<object>;
            if (grades != null)
            {
                var gradeData = grades[0] as Dictionary<string, object>;
                if (gradeData != null)
                {
                    double currentGrade = Convert.ToDouble(gradeData["Grade"]);

                    return currentGrade;
                }
            }
            return -5;
        }

        public async Task<string> SubmitGrade(string className, string studentName, string subject, double grade)
        {
            ClassModel? atualClass = await _classService.GetClassByName(className);
            if (atualClass == null)
                return "NullClass";

            UserModel? student = await _classService.GetStudentByName(studentName);
            if (student == null)
                return "NullStudent";

            DocumentReference documentReference = _firestoreDb.Collection("classes").Document(atualClass.Id);

            DocumentSnapshot documentSnapshot = await documentReference.GetSnapshotAsync();
            if (!documentSnapshot.Exists)
                return "ClassNotFound";

            Dictionary<string, object> classData = documentSnapshot.ToDictionary();

            if (!classData.TryGetValue("Students", out object? studentsObj) || studentsObj is not List<object> students)
                return "FieldStudentsNull";

            var studentData = students
                .OfType<Dictionary<string, object>>()
                .FirstOrDefault(s => s["StudentId"].ToString() == student.Id);

            if (studentData == null)
                return "StudentNotFound";

            if (!studentData.TryGetValue("Subjects", out object? subjectsObj) || subjectsObj is not List<object> subjects)
                return "FieldSubjectNull";

            var subjectData = subjects
                .OfType<Dictionary<string, object>>()
                .FirstOrDefault(s => s.ContainsKey(subject));

            if (subjectData == null)
                return "SubjectNotFound";

            var grades = subjectData[subject] as List<object>;
            if (grades != null)
            {
                var gradeData = grades[0] as Dictionary<string, object>;
                if (gradeData != null)
                {
                    double currentGrade = Convert.ToDouble(gradeData["Grade"]);

                    double newGrade = currentGrade + grade;

                    if (newGrade > 100 || newGrade < 0)
                        return ("GradeInvalidFormat");

                    gradeData["Grade"] = newGrade;

                    await documentReference.UpdateAsync(new Dictionary<string, object>
                    {
                        { "Students", students }
                    });

                    return "Success";
                }                
            }            

            return "Failed";
        }
    }
}
