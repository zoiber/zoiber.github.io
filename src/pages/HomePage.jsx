import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { blogPosts } from '@/data/blog';
import NewsletterSubscribe from '@/components/NewsletterSubscribe';

const HomePage = () => {
  const navigate = useNavigate();
  const recentPosts = blogPosts.slice(0, 3);

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
            Ideas, análisis y visión sobre la nueva revolución industrial.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
            <button onClick={() => navigate('/portafolio')} className="btn-primary inline-flex items-center text-lg">
              Comienza a explorar
              <ArrowRight className="ml-2" size={20} />
            </button>
          </motion.div>
        </div>
      </section>

      <section id="recent-posts" className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Artículos Recientes</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Mis últimas publicaciones sobre el futuro de la industria.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post, index) => (
              <motion.article key={post.id} className="blog-card" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }} viewport={{ once: true }}>
                <Link to={`/portafolio/${post.id}`} className="block">
                  <div className="h-48 overflow-hidden">
                    <img className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" alt={post.title} src={post.image} />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <span className="font-semibold text-amber-600 bg-amber-100 py-1 px-2 rounded-full text-xs mr-3">{post.category}</span>
                      <Calendar size={16} className="mr-1" />
                      {post.date}
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">{post.title}</h3>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <span className="text-amber-500 font-semibold hover:text-amber-600 transition-colors inline-flex items-center">
                      Leer más <ArrowRight className="ml-1" size={16} />
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <NewsletterSubscribe />
    </>
  );
};

export default HomePage;