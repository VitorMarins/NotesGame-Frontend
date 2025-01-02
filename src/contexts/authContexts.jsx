// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import PropTypes from 'prop-types';
import { AuthContext } from './contexts.jsx';

const AuthProvider = ({ children }) => {
    const [usuarioId, setUsuarioId] = useState('');
    const [usuarioNome, setUsuarioNome] = useState('');
    useEffect(() => {
        const decodeToken = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const decoded = await jwtDecode(token);
                    setUsuarioId(decoded.id);
                    setUsuarioNome(decoded.nome);
                } catch (error) {
                    console.error('Erro ao decodificar o token:', error);
                }
            }
        };
        decodeToken();
    }, []);
    return (
        <AuthContext.Provider value={{ usuarioId, usuarioNome }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthProvider;