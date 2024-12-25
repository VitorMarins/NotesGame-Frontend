import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PaginaCadastro.css';
import Header from './../../components/Header';
import Footer from './../../components/Footer';

function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!nome) {
      newErrors.nome = 'Nome de usuário é obrigatório';
    }

    if (!email) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Formato de email inválido';
    }

    if (!password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const user = { nome, email, password };
        const response = fetch('http://localhost:3001/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),  
        });
          if (response.ok) {
            navigate('/login');
          } else {
            throw new Error('Erro ao criar conta');
          }
      } catch (error) {
        console.error(error);
      }
      navigate('/');
    }
  };

  return (
    <>
    <Header />
      <form onSubmit={handleSubmit} id='form-cad-container'>
        <h2>Criar uma nova conta</h2>
          <label>Nome de Usuário</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          {errors.nome && <p id='error'>{errors.nome}</p>}
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p id='error'>{errors.email}</p>}
          <label>Senha</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p id='error'>{errors.password}</p>}
          <label>Confirme a Senha</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.confirmPassword && (
            <p id='error'>{errors.confirmPassword}</p>
          )}
        <button type="submit">Criar Conta</button>
        </form>
        <div id="login-container">
            <p><a onClick={() => navigate('/login')}>Tem uma conta?</a></p>
        </div>
        <Footer />
    </>
  );
}

export default Cadastro;