using Google.Cloud.Firestore;
using InstitutoCopacabanaAPI.Data;
using InstitutoCopacabanaAPI.Models;
using InstitutoCopacabanaAPI.Services.Interfaces;

namespace InstitutoCopacabanaAPI.Services.Classes
{
    public class ClassService : IClassService
    {
        public readonly FirestoreDb _firebaseClient;

        public ClassService(ContextDb contextDb)
        {
            _firebaseClient = contextDb.GetClient();
        }


        public async Task<ClassModel> CreateClass(ClassModel schoolClass)
        {
            DocumentReference docRef = _firebaseClient.Collection("classes").Document(schoolClass.Id);

            await docRef.SetAsync(schoolClass);

            return schoolClass;
        }
    }
}
