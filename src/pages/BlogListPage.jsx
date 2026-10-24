import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { getAllPosts } from '../utils/blogLoader';

const BlogListPage = () => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('q') || '';
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
        <title>Blog - Pablo Lucero | Transformación Digital Industrial</title>
        <meta name="description" content="Tu punto de apoyo en el viaje hacia la transformación digital. Artículos y noticias sobre transformación digital industrial, Industria 4.0, IoT y automatización." />
      </Helmet>
      <div className="section-padding pt-32 bg-white min-h-screen">
        <div className="container-custom">

          <div className="mb-12">
            <div className="flex flex-wrap justify-center gap-3 mb-16">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-8 py-2.5 rounded-full font-bold transition-all duration-300 tracking-wide text-sm ${selectedCategory === category
                    ? 'bg-gray-900 text-amber-400 shadow-xl scale-105'
                    : 'bg-white text-gray-500 hover:text-amber-500 hover:bg-amber-50 border border-gray-100 shadow-sm'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-10">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link to={`/blog/${post.slug}`} className="group block">
                  <div className="relative overflow-hidden rounded-3xl aspect-[16/10] shadow-lg mb-6">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                    <div className="absolute top-6 right-6 z-10">
                      <span className="bg-white/20 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-white/30 shadow-inner opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                        {post.category}
                      </span>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight group-hover:text-amber-400 transition-colors duration-300">
                        {post.title}
                      </h3>
                      <p className="text-gray-300 line-clamp-2 text-sm md:text-base opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>
                  </Link>
                </motion.article>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-20">
                <p className="text-xl text-gray-500">No se encontraron proyectos con esos criterios.</p>
                <button
                  onClick={() => setSelectedCategory('Todos')}
                  className="mt-4 text-amber-500 font-bold hover:underline"
                >
                  Ver todos los proyectos
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogListPage;
