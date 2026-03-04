import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Pablo Lucero - Tu punto de apoyo en el viaje hacia la transformación digital.</title>
        <meta name="description" content="Tu punto de apoyo en el viaje hacia la transformación digital. Portafolio personal sobre transformación digital industrial, Industria 4.0, IIoT y tecnología. Ideas, análisis y visión para conectar tecnología e industria." />
        <meta name="keywords" content="transformación digital, automatización industrial, IoT, portafolio, experto, industria 4.0" />
      </Helmet>

      <section id="inicio" className="relative min-h-[80vh] md:min-h-screen flex items-center justify-center overflow-hidden text-center">
        <div className="absolute inset-0 z-0">
          <img className="w-full h-full object-cover" alt="Fondo de fábrica moderna con redes digitales" src="https://images.unsplash.com/photo-1581092446347-a7c1b86409d3" />
          <div className="absolute inset-0 hero-gradient"></div>
        </div>
        <div className="relative z-10 text-white container-custom">
          <motion.h1 className="text-4xl md:text-6xl font-bold mb-4" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            Conectando tecnología e industria
          </motion.h1>
          <motion.p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            Ideas y proyectos sobre la nueva revolución industrial.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
            <button onClick={() => navigate('/portafolio')} className="btn-primary inline-flex items-center text-lg">
              Comienza a explorar
              <ArrowRight className="ml-2" size={20} />
            </button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default HomePage;