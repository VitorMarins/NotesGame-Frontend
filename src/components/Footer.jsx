// eslint-disable-next-line no-unused-vars
import React from 'react';
import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';
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
            <div className="social-icons">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <FaFacebook />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                    <FaTwitter />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <FaInstagram />
                </a>
            </div>
        </footer>
    );
};

export default Footer;
