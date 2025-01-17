import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PaginaCadastro.css';
import { Header, Footer } from './../../imports/importsComponents.jsx';

function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmSenha, setConfirmSenha] = useState('');
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

    if (!senha) {
      newErrors.senha = 'Senha é obrigatória';
    } else if (senha.length < 6) {
      newErrors.senha = 'Senha deve ter pelo menos 6 caracteres';
    }

    if (senha !== confirmSenha) {
      newErrors.confirmSenha = 'As senhas não coincidem';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const user = { nome, email, senha };
        const response = await fetch('https://listajogos-backend.onrender.com/api/auth/registrar', {
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
    }
  };

  return (
    <>
      <Header />
      <form onSubmit={handleSubmit} id='form-cad-container'>
        <h2>Criar uma nova conta</h2>
        <input
        type="text"
        placeholder='Digite seu nome'
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        />
        {errors.nome && <p id='error'>{errors.nome}</p>}
        <input
        type="email"
        placeholder='Digite seu e-mail'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p id='error'>{errors.email}</p>}
        <input
        type="password"
        placeholder='Digite sua senha'
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        />
        {errors.senha && <p id='error'>{errors.senha}</p>}
        <input
        type="password"
        placeholder='Digite novamente sua senha'
        value={confirmSenha}
        onChange={(e) => setConfirmSenha(e.target.value)}
        />
        {errors.confirmSenha && <p id='error'>{errors.confirmSenha}</p>}
        <button type="submit" id='btn-sbt'>Criar Conta</button>
        </form>
        <div id="login-container">
            <a onClick={() => navigate('/login')}>Tem uma conta?</a>
        </div>
      <Footer />  
    </>
  );
}

export default Cadastro;