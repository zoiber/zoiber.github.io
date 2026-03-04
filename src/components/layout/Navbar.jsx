import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const navLinks = [
  { id: 'inicio', label: 'Inicio', path: '/' },
  { id: 'blog', label: 'Blog', path: '/blog' },
  { id: 'acerca-de', label: 'Acerca de', path: '/acerca-de' },
  //{ id: 'recursos', label: 'Recursos', path: '/recursos' },
  { id: 'contacto', label: 'Contacto', path: '/contacto' }
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activePath, setActivePath] = useState('/');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setActivePath(location.pathname);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleNavClick = (path) => {
    setIsMenuOpen(false);
    navigate(path);
  };

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-lg z-50">
      <div className="container-custom">
        <div className="flex justify-between items-center py-4">
          <motion.div 
            className="text-2xl font-bold text-gradient cursor-pointer"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => handleNavClick('/')}
          >
            Pablo Lucero
          </motion.div>

          <div className="hidden md:flex space-x-8">
            {navLinks.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.path)}
                className={`nav-link ${activePath.startsWith(item.path) && item.path !== '/' || activePath === item.path ? 'active' : ''}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t"
          >
            <div className="container-custom py-4">
              {navLinks.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.path)}
                  className="block w-full text-left py-2 nav-link"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;