// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useNavigate } from "react-router";
import {jwtDecode} from 'jwt-decode';
import { GiGamepad } from "react-icons/gi";
import './Header.css';

const Header = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
        let nomeUsuario = '';
    
        if (token) {
            try {
                const decoded = jwtDecode(token);
                console.log(decoded)
                nomeUsuario = decoded.nome;
            } catch (error) {
                console.error('Erro ao decodificar o token:', error);
            }
        }

    // Verifica se o token de autenticação está presente no localStorage
    const isAuthenticated = token !== null;

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <header id='header-container'>
            <div id="titulo">
                <GiGamepad size={50} />
                <h1>NotesGame</h1>
            </div>
            <div id='nav-container'>
                <button className='btn-nav' onClick={() => navigate('/')}>
                    Home
                </button>
                {isAuthenticated ? (
                    <>
                        <p id='nome-usuario'>{nomeUsuario}</p>
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
