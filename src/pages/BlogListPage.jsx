import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Calendar } from 'lucide-react';
import { getAllPosts } from '../utils/blogLoader';
import NewsletterSubscribe from '@/components/NewsletterSubscribe';

const BlogListPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [posts, setPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  useEffect(() => {
    const loadedPosts = getAllPosts();
    setPosts(loadedPosts);
  }, []);

  const categories = useMemo(() => {
    return ['Todos', ...new Set(posts.map(post => post.category))];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    const categoryFiltered = selectedCategory === 'Todos'
      ? posts
      : posts.filter(post => post.category === selectedCategory);

    return categoryFiltered.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, selectedCategory, posts]);

  return (
    <>
      <Helmet>
        <title>Portafolio - Pablo Lucero | Transformación Digital Industrial</title>
        <meta name="description" content="Tu punto de apoyo en el viaje hacia la transformación digital. Artículos y noticias sobre transformación digital industrial, Industria 4.0, IoT y automatización." />
      </Helmet>
      <div className="section-padding pt-32 bg-white">
        <div className="container-custom">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-5xl font-bold mb-4"><span className="text-gradient">Portafolio</span></h1>
          </motion.div>

          <div className="mb-12">
            <div className="relative max-w-lg mx-auto mb-8">
              <input
                type="text"
                placeholder="Buscar artículos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input pl-12 h-12"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            </div>

            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${selectedCategory === category
                    ? 'bg-amber-500 text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-amber-50 shadow-sm border border-gray-100'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                className="relative group rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 bg-white border border-gray-100"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link to={`/portafolio/${post.id}`} className="block">
                  <div className="relative overflow-hidden aspect-[16/10]">
                    <img
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      alt={post.title}
                      src={post.image}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-90 transition-opacity duration-500 flex flex-col justify-end p-8 md:p-10">
                      <span className="text-amber-400 text-sm font-bold uppercase tracking-[0.2em] mb-3 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">{post.category}</span>
                      <h2 className="text-white text-2xl md:text-3xl font-bold leading-tight mb-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 delay-75">{post.title}</h2>
                      <p className="text-gray-300 text-sm md:text-base line-clamp-2 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-510 delay-100">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
              <p className="text-xl text-gray-500">No se encontraron artículos que coincidan con tu búsqueda.</p>
              <button onClick={() => { setSearchTerm(''); setSelectedCategory('Todos'); }} className="text-amber-600 font-semibold mt-4 hover:underline">Ver todos los artículos</button>
            </div>
          )}
        </div>
      </div>
      <NewsletterSubscribe />
    </>
  );
};

export default BlogListPage;