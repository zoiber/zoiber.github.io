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
        <title>Blog - Pablo Lucero | Transformación Digital Industrial</title>
        <meta name="description" content="Tu punto de apoyo en el viaje hacia la transformación digital. Artículos y noticias sobre transformación digital industrial, Industria 4.0, IoT y automatización." />
      </Helmet>
      <div className="section-padding pt-32 bg-white">
        <div className="container-custom">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">El <span className="text-gradient">Blog</span></h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Un espacio para compartir ideas, análisis y visión sobre la nueva revolución industrial.</p>
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.article key={post.id} className="blog-card" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }}>
                <Link to={`/blog/${post.id}`} className="block">
                  <div className="h-48 overflow-hidden">
                    <img className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" alt={post.title} src={post.image} />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <span className="font-semibold text-amber-600 bg-amber-100 py-1 px-2 rounded-full text-xs mr-3">{post.category}</span>
                      <Calendar size={16} className="mr-1" />
                      {post.date}
                    </div>
                    <h2 className="text-xl font-semibold mb-3 text-gray-900">{post.title}</h2>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <span className="text-amber-500 font-semibold hover:text-amber-600 transition-colors inline-flex items-center">
                      Leer más <ArrowRight className="ml-1" size={16} />
                    </span>
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