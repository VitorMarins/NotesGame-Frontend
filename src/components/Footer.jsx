// eslint-disable-next-line no-unused-vars
import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer" aria-label="Footer">
            <p>&copy; {new Date().getFullYear()} NotesGame. Todos os direitos reservados.</p>
        </footer>
    );
};

export default Footer;
