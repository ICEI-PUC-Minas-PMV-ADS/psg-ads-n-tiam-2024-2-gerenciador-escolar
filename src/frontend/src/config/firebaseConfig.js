// Importa as funções necessárias dos SDKs do Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC9gla3k9WfOSlf8jJCukk9YoWj0TECZTU",
  authDomain: "gerenciador-escolar-cbad7.firebaseapp.com",
  databaseURL: "https://gerenciador-escolar-cbad7-default-rtdb.firebaseio.com",
  projectId: "gerenciador-escolar-cbad7",
  storageBucket: "gerenciador-escolar-cbad7.firebasestorage.app",
  messagingSenderId: "468548710929",
  appId: "1:468548710929:web:183e63d9cf54337780f7b0"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa o serviço de autenticação
const auth = getAuth(app);

// Exporta o auth para ser usado em outros módulos
export { auth };
