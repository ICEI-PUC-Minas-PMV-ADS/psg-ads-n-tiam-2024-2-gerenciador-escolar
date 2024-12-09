namespace InstitutoCopacabanaAPI.Services.Interfaces
{
    public interface IGradeService
    {
        public Task<double> GetGrade(string className, string studentName, string subject);
        public Task<string> SubmitGrade(string className, string studentName, string subject, double grade);
        public Task<object?> GetStudentReportAsync(string studentId, string className);
    }
}
