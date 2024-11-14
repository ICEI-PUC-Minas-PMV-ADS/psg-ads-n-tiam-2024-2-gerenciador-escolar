using InstitutoCopacabanaAPI.Models;

namespace InstitutoCopacabanaAPI.Services.Interfaces
{
    public interface IClassService
    {
        public Task<ClassModel> CreateClass(ClassModel model);
    }
}
