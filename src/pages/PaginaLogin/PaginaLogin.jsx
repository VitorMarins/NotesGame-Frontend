import { useState, useEffect } from 'react';
import './PaginaLogin.css';
import { useNavigate } from 'react-router-dom';
import { Header, Footer } from './../../imports/importsComponents.jsx';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://listajogos-backend.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
      });
      const token = await response.json();
      localStorage.setItem('token', token.token);
      navigate('/');
    }
    catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/');
    }
  }, [navigate]);

  return (
  <>
    <Header />
    <main>
        {/* Login */}
        <div id="login-container">
            <h2>Lista de jogos - Login</h2>
            <p>Entre com sua conta</p>
            <form id="login-form" onSubmit={handleLogin}>
              <input
                type="email"
                name="email"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required />
              <input
                type="password"
                name="senha"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required />
              <input
                type="submit"
                value="Login" />
            </form>
        </div>
    </main>
    <Footer />
  </>
  );
}

export default Login;