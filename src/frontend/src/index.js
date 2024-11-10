import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from './config/firebaseConfig';

// Componente Header, com o botão de logout
const Header = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login'); // Redireciona para a página de login após o logout
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <header style={{ backgroundColor: 'gray', padding: '10px', textAlign: 'right' }}>
      <button
        onClick={handleLogout}
        style={{ backgroundColor: 'gray', color: 'white', border: 'none', padding: '10px', cursor: 'pointer' }}
      >
        Logout
      </button>
    </header>
  );
};

// Componente Login
const Login = () => (
  <div>
    <h2>Login</h2>
    {/* adicionar um formulário do login */}
  </div>
);

// Renderiza as rotas diretamente no index.js
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header /> {/* Cabeçalho visível em todas as páginas */}
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* Outras rotas podem ser adicionadas aqui */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
