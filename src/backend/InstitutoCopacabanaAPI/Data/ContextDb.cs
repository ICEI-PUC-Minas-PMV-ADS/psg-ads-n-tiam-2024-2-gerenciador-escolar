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

            var jsonString = File.ReadAllText("C:\\Users\\caisi\\OneDrive\\Área de Trabalho\\Faculdade\\TIAM\\psg-ads-n-tiam-2024-2-gerenciador-escolar\\src\\backend\\InstitutoCopacabanaAPI\\serviceAccountKeyDevelop.json");

            var builder = new FirestoreClientBuilder { JsonCredentials = jsonString };

            _client = FirestoreDb.Create(firebaseConfig["project_id"], builder.Build());

        }

        public FirestoreDb GetClient()
        {
            return _client;
        }
    }
}
