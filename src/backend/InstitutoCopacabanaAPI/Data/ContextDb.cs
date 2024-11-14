using Google.Cloud.Firestore;
using Google.Cloud.Firestore.V1;


namespace InstitutoCopacabanaAPI.Data
{
    public class ContextDb
    {
        //Variavel referente a conexão com o Firestore Database
        private readonly FirestoreDb _client;

        public ContextDb(IConfiguration configuration)
        {
            var firebaseConfig = configuration.GetSection("FirestoreConnection");

            var jsonFilePath = configuration.GetValue<string>("LinkServiceAccountKey:Path");

            var jsonString = File.ReadAllText(jsonFilePath!);

            var builder = new FirestoreClientBuilder { JsonCredentials = jsonString };

            _client = FirestoreDb.Create(firebaseConfig["project_id"], builder.Build());

        }

        public FirestoreDb GetClient()
        {
            return _client;
        }

    }
}
