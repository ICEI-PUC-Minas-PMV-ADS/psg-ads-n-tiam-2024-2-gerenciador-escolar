using InstitutoCopacabanaAPI.Models;

namespace InstitutoCopacabanaAPI.Services.Interfaces
{
    public interface IClassService
    {
        public Task<ClassModel?> GetClassByName(string className);
        public Task<UserModel?> GetStudentByName(string studentName);
        public Task<List<StudentModel>> GetStudentsByClassName(string className);
        public Task<List<AttendanceModel>> GetAttendanceByStudentName(string studentName);
        public Task<ClassModel> CreateClass(ClassModel model);
        public Task<StudentModel> InsertStudent(string classId, UserModel student, string className);

    }
}
