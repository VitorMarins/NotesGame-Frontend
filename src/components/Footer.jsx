// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };
    return (
        <footer className="footer" aria-label="Footer">
            <p>&copy; {new Date().getFullYear()} Lista de jogos. Todos os direitos reservados.</p>
            <ul className="footer-links">
                <li><button onClick={() => handleNavigation('/privacy-policy')}>Política de Privacidade</button></li>
                <li><button onClick={() => handleNavigation('/terms-of-service')}>Termos de Serviço</button></li>
                <li><button onClick={() => handleNavigation('/contact')}>Contato</button></li>
            </ul>
        </footer>
    );
};

export default Footer;
