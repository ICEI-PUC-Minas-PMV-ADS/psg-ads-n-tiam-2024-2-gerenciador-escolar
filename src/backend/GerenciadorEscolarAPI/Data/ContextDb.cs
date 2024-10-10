using FireSharp;
using FireSharp.Config;
using FireSharp.Interfaces;

namespace GerenciadorEscolarAPI.Data
{
    public class ContextDb
    {
        public IFirebaseClient _client;

        public ContextDb()
        {
            IFirebaseConfig config = new FirebaseConfig
            {
                AuthSecret = "J25zaqHLQMmwnb2k1kxVJWzbPnNOyN5plwW69HgZ",
                BasePath = "https://gerenciador-escolar-cbad7-default-rtdb.firebaseio.com/"
            };

            _client = new FirebaseClient(config);
        }

        public IFirebaseClient GetClient()
        {
            return _client;
        }
    }
}
