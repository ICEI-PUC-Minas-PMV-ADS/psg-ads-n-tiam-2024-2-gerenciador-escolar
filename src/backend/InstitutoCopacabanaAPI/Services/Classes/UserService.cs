using FirebaseAdmin.Auth;
using InstitutoCopacabanaAPI.Data;
using Google.Cloud.Firestore;
using InstitutoCopacabanaAPI.Models;
using InstitutoCopacabanaAPI.Services.Interfaces;
using Firebase.Auth;
using Google.Protobuf.WellKnownTypes;

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

        public async Task CreateAuthentication(UserModel user)
        {
            UserRecordArgs args = new UserRecordArgs
            {
                Uid = user.Id,
                Email = user.Email,
                Password = user.Password
            };

            UserRecord userRecord = await FirebaseAdmin.Auth.FirebaseAuth.DefaultInstance.CreateUserAsync(args);
        }

        public async Task UpdateAuthentication(UserModel user)
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
            await CreateAuthentication(user);

            //A senha irá ficar vazia no firestore, já que o Firebase Authenticantion cuida da parte do acesso de usuário
            user.Password = String.Empty;

            if(user.UserType != "Student")
            {
                user.ClassName = null;
            }

            DocumentReference docRef = _firebaseClient.Collection("users").Document(user.Id);            

            await docRef.SetAsync(user);            

            return user;
        }

        public async Task<UserModel> PutUser(UserModel user)
        {
            //Atualiza a autenticação com o UID igual ao Id do banco de dados
            await UpdateAuthentication(user);

            //A senha irá ficar vazia no firestore, já que o Firebase Authenticantion cuida da parte do acesso de usuário
            user.Password = String.Empty;

            DocumentReference docRef = _firebaseClient.Collection("users").Document(user.Id);

            await docRef.SetAsync(user, SetOptions.Overwrite);

            return user;
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
