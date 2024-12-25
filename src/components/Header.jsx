// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useNavigate } from "react-router";
import { GiGamepad } from "react-icons/gi";
import './Header.css';

const Header = () => {
    const navigate = useNavigate();

    // Verifica se o token de autenticação está presente no localStorage
    const isAuthenticated = localStorage.getItem('token') !== null;

    const handleLogout = () => {
        // Remove o token do localStorage para efetuar o logout
        localStorage.removeItem('token');
        navigate('/'); // Redireciona para a página inicial após o logout
    };

    return (
        <header id='header-container'>
            <GiGamepad size={50} />
            <div id='nav-container'>
                <button className='btn-nav' onClick={() => navigate('/')}>
                    Home
                </button>
                {isAuthenticated ? (
                    <>
                        <button className='btn-nav' onClick={handleLogout}>
                            Sair
                        </button>
                    </>
                ) : (
                    <>
                        <button className='btn-nav' onClick={() => navigate('/login')}>
                            Entrar
                        </button>
                        <button className='btn-nav' onClick={() => navigate('/cadastro')}>
                            Cadastrar
                        </button>
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;
