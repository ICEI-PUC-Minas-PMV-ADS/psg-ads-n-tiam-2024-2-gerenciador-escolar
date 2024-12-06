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
        public async Task<object?> GetStudentReportAsync(string studentName, string className)
        {

            try
            {
                ClassModel? atualClass = await _classService.GetClassByName(className);
                if (atualClass == null)
                    throw new Exception("Essa turma não existe.");

                UserModel? student = await _classService.GetStudentByName(studentName);
                if (student == null)
                    throw new Exception("Esse aluno não existe.");

                var documentReference = _firestoreDb.Collection("classes").Document(atualClass.Id);
                var documentSnapshot = await documentReference.GetSnapshotAsync();

                if (!documentSnapshot.Exists)
                    return null;

                Dictionary<string, object> classData = documentSnapshot.ToDictionary();

                if (!classData.TryGetValue("Students", out object? studentsObj) || studentsObj is not List<object> students)
                    throw new Exception("Não foi possível encontrar alunos nessa turma.");

                var studentData = students
                    .OfType<Dictionary<string, object>>()
                    .FirstOrDefault(s => s["StudentId"].ToString() == student.Id);

                if (studentData == null)
                    throw new Exception("Aluno não encontrado.");

                if (!studentData.TryGetValue("Subjects", out object? subjectsObj) || subjectsObj is not List<object> subjects)
                    throw new Exception("Máterias não encontradas.");

                var reportData = new List<object>();

                foreach (var subjectObj in subjects)
                {
                    if (subjectObj is not Dictionary<string, object> subjectData)
                        continue;

                    foreach (var kvp in subjectData)
                    {
                        string subjectName = kvp.Key;
                        var subjectDetails = kvp.Value as List<object>;

                        if (subjectDetails == null || subjectDetails.Count == 0)
                            continue;

                        var detailData = subjectDetails[0] as Dictionary<string, object>;

                        var grades = detailData != null && detailData.ContainsKey("Grade")
                            ? detailData["Grade"]
                            : new List<object>();

                        var attendance = detailData != null && detailData.ContainsKey("Attendance")
                            ? detailData["Attendance"]
                            : null;

                        reportData.Add(new
                        {
                            Subject = subjectName,
                            Grades = grades,
                            Attendance = attendance
                        });
                    }
                }

                return new
                {
                    StudentId = student.Id,
                    Name = studentName,
                    Report = reportData
                };

            }
            catch (Exception ex)
            {
                throw new Exception("Erro ao obter o relatório do aluno: " + ex.Message);
            }
        }

    }
}
