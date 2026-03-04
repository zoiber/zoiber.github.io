import React from 'react';
import { Linkedin, X, Rss } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const handleSocialClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleNavClick = (path) => {
    navigate(path);
  };

  return (
    <footer className="bg-gray-900 text-white section-padding">
      <div className="container-custom">
        <div className="grid md:grid-cols-3 gap-8 mb-8 text-center md:text-left">
          <div>
            <h3 className="text-2xl font-bold text-gradient mb-4">Pablo Lucero</h3>
            <p className="text-gray-400 mb-4">
              Conectando tecnología e industria: ideas, análisis y visión.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Navegación</h4>
            <ul className="space-y-2">
              <li><button onClick={() => handleNavClick('/sobre-mi')} className="footer-link">Sobre Mí</button></li>
              <li><button onClick={() => handleNavClick('/blog')} className="footer-link">Blog</button></li>
              <li><button onClick={() => handleNavClick('/recursos')} className="footer-link">Recursos</button></li>
              <li><button onClick={() => handleNavClick('/contacto')} className="footer-link">Contacto</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Conecta</h4>
            <div className="flex space-x-4 justify-center md:justify-start">
              <button onClick={() => handleSocialClick('https://www.linkedin.com/in/pablo-lucero-ec/')} className="social-icon"><Linkedin size={20} /></button>
              <button onClick={() => handleSocialClick('https://x.com/PabloLuceroEC')} className="social-icon"><X size={20} /></button>
              <button onClick={() => handleNavClick('/blog')} className="social-icon"><Rss size={20} /></button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Pablo Lucero. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;