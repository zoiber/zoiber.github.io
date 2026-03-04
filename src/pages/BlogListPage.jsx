import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, Calendar, X as CloseIcon, User, ArrowLeft } from 'lucide-react';
import { getAllPosts } from '../utils/blogLoader';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { AnimatePresence } from 'framer-motion';

const ProjectModal = ({ post, isOpen, onClose }) => {
  if (!post) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl z-10 custom-scrollbar"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 bg-gray-100 hover:bg-amber-100 text-gray-500 hover:text-amber-600 rounded-full transition-colors duration-300 z-20"
            >
              <CloseIcon size={24} />
            </button>

            <div className="p-0">
              <div className="aspect-[21/9] w-full relative">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
              </div>

              <div className="px-8 pb-12 md:px-16 -mt-20 relative z-10">
                <span className="inline-block px-4 py-1.5 bg-amber-100 text-amber-700 rounded-full text-sm font-bold uppercase tracking-widest mb-6 border border-amber-200 shadow-sm">
                  {post.category}
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  {post.title}
                </h2>

                <div className="flex flex-wrap items-center gap-6 text-gray-500 font-medium mb-10 pb-10 border-b border-gray-100">
                  <div className="flex items-center">
                    <Calendar size={18} className="mr-2 text-amber-500" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center">
                    <User size={18} className="mr-2 text-amber-500" />
                    <span>{post.author}</span>
                  </div>
                </div>

                <div className="prose prose-lg max-w-none text-gray-700 prose-headings:text-gray-900 prose-amber">
                  <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                    {post.content}
                  </ReactMarkdown>
                </div>

                <div className="mt-16 pt-10 border-t border-gray-100 flex justify-center">
                  <button
                    onClick={onClose}
                    className="btn-primary"
                  >
                    Cerrar Proyecto
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const BlogListPage = () => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('q') || '';
  const [posts, setPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadedPosts = getAllPosts();
    setPosts(loadedPosts);
  }, []);

  const openPost = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closePost = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

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
                  className="group cursor-pointer"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  onClick={() => openPost(post)}
                >
                  <div className="relative overflow-hidden rounded-3xl aspect-[16/10] shadow-lg mb-6">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                    <div className="absolute top-6 right-6">
                      <span className="bg-white/20 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-white/30 shadow-inner">
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

      <ProjectModal
        post={selectedPost}
        isOpen={isModalOpen}
        onClose={closePost}
      />
    </>
  );
};

export default BlogListPage;