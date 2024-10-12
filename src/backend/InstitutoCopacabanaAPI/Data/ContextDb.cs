using FireSharp.Config;
using FireSharp.Interfaces;
using FireSharp; 

namespace InstitutoCopacabanaAPI.Data
{
    public class ContextDb
    {
        public IFirebaseClient _client;

        public ContextDb(IConfiguration configuration)
        {
            var firebaseConfig = configuration.GetSection("FirebaseConnection");

            IFirebaseConfig config = new FirebaseConfig
            {
                AuthSecret = firebaseConfig["AuthSecret"],
                BasePath = firebaseConfig["BasePath"]
            };

            _client = new FirebaseClient(config);
        }

        public IFirebaseClient GetClient()
        {
            return _client;
        }
    }
}
