import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import { PaginaHome, PaginaLogin, PaginaCadastro , Pagina404 } from './imports/importsPaginas';
import AuthProvider from './contexts/authContexts';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>  
          <Route path="/" element={<PaginaHome />} />
          <Route path="/login" element={<PaginaLogin />} />
          <Route path="/cadastro" element={<PaginaCadastro />} />
          <Route path="*" element={<Pagina404 />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
