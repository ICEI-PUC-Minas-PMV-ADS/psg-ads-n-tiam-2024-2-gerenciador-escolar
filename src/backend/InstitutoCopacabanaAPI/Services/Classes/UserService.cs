using FirebaseAdmin.Auth;
using InstitutoCopacabanaAPI.Data;
using Google.Cloud.Firestore;
using InstitutoCopacabanaAPI.Models;
using InstitutoCopacabanaAPI.Services.Interfaces;
using Firebase.Auth;

namespace InstitutoCopacabanaAPI.Services.Classes
{
    public class UserService : IUserService
    {
        private readonly FirestoreDb _firebaseClient;
        private readonly FirebaseAuthProvider _auth;

        public UserService(ContextDb contextDb, AuthConnection authConnection)
        {
            _firebaseClient = contextDb.GetClient();
            _auth = authConnection.GetAuth();
        }

        public async Task CreateAuthenticantion(UserModel user)
        {
            UserRecordArgs args = new UserRecordArgs
            {
                Uid = user.Id,
                Email = user.Email,
                Password = user.Password
            };

            UserRecord userRecord = await FirebaseAdmin.Auth.FirebaseAuth.DefaultInstance.CreateUserAsync(args);
        }

        public async Task UpdateAuthenticantion(UserModel user)
        {
            UserRecordArgs args = new UserRecordArgs
            {
                Uid = user.Id,
                Email = user.Email,
                Password = user.Password
            };

            UserRecord userRecord = await FirebaseAdmin.Auth.FirebaseAuth.DefaultInstance.UpdateUserAsync(args);
        }

        public async Task<UserModel> PostUser(UserModel user)
        {
            //Registra a autenticação com o UID igual ao Id do banco de dados
            await CreateAuthenticantion(user);

            UserModel finalUser = new UserModel
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,                
                UserType = user.UserType
            };          

            DocumentReference docRef = _firebaseClient.Collection("users").Document(user.Id);            

            await docRef.SetAsync(finalUser);            

            return finalUser;
        }

        public async Task<UserModel> PutUser(UserModel user)
        {
            //Atualiza a autenticação com o UID igual ao Id do banco de dados
            await UpdateAuthenticantion(user);

            UserModel finalUser = new UserModel
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,                
                UserType = user.UserType
            };            

            DocumentReference docRef = _firebaseClient.Collection("users").Document(user.Id);

            await docRef.SetAsync(finalUser, SetOptions.Overwrite);

            return finalUser;
        }

        public async Task<bool> VerifyPostEmail(string email)
        {
            CollectionReference usersRef = _firebaseClient.Collection("users");

            Query query = usersRef.WhereEqualTo("Email", email);
            QuerySnapshot snapshot = await query.GetSnapshotAsync();

            if (snapshot.Documents.Count == 0)
                return true;

            return false;
        }

        public async Task<bool> VerifyPutEmail(string email, string id)
        {
            DocumentReference docRef = _firebaseClient.Collection("users").Document(id);
            DocumentSnapshot snapshot = await docRef.GetSnapshotAsync();

            if (!snapshot.Exists)
                throw new Exception("Usuário não encontrado.");

            UserModel user = snapshot.ConvertTo<UserModel>();

            if (user.Email == email)
                return true;

            return await VerifyPostEmail(email);
        }
    }
}
