import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Search } from 'lucide-react';
import { blogPosts } from '@/data/blog';
import NewsletterSubscribe from '@/components/NewsletterSubscribe';

const allCategories = ["Todos", ...new Set(blogPosts.map(p => p.category))];

const BlogListPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todos');

  const filteredPosts = useMemo(() => {
    return blogPosts
      .filter(post => activeCategory === 'Todos' || post.category === activeCategory)
      .filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase()) || post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [searchTerm, activeCategory]);

  return (
    <>
      <Helmet>
        <title>Portafolio - Pablo Lucero | Transformación Digital Industrial</title>
        <meta name="description" content="Tu punto de apoyo en el viaje hacia la transformación digital. Artículos y noticias sobre transformación digital industrial, Industria 4.0, IoT y automatización." />
      </Helmet>
      <div className="section-padding pt-32 bg-white">
        <div className="container-custom">
          <motion.div className="text-center mb-8" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">El <span className="text-gradient">Portafolio</span></h1>
          </motion.div>

          <div className="mb-12">
            <div className="relative max-w-lg mx-auto mb-6">
              <input
                type="text"
                placeholder="Buscar artículos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input pl-10"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {allCategories.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${activeCategory === category ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                className="break-inside-avoid relative group rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link to={`/portafolio/${post.id}`} className="block">
                  <div className="relative overflow-hidden">
                    <img
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                      alt={post.title}
                      src={post.image}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                      <span className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{post.category}</span>
                      <h2 className="text-white text-xl font-bold leading-tight transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">{post.title}</h2>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
          {filteredPosts.length === 0 && (
            <p className="text-center text-gray-500 mt-12">No se encontraron artículos. Intenta con otra búsqueda o categoría.</p>
          )}
        </div>
      </div>
      <NewsletterSubscribe />
    </>
  );
};

export default BlogListPage;