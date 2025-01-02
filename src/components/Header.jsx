// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GiGamepad } from "react-icons/gi";
import './Header.css';
import { AuthContext } from './../contexts/contexts';

const Header = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const { usuarioNome } = useContext(AuthContext);
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
                        <p id='nome-usuario'>{usuarioNome}</p>
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
