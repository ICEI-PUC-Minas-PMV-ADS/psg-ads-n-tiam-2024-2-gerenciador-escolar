using InstitutoCopacabanaAPI.Models;

namespace InstitutoCopacabanaAPI.Services.Interfaces
{
    public interface IClassService
    {
        public Task<ClassModel?> GetClassByName(string className);
        public Task<UserModel?> GetStudentByName(string studentName);
        public Task<ClassModel> CreateClass(ClassModel model);
        public Task<StudentModel> InsertStudent(string classId, UserModel student);

    }
}
