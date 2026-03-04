import React, { useEffect, useState, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowLeft, Linkedin, X, Facebook, Send } from 'lucide-react';
import { blogPosts } from '@/data/blog';
import NewsletterSubscribe from '@/components/NewsletterSubscribe';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';

const CommentForm = ({ postId, onCommentSubmitted }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ nombre: '', correo: '', comentario: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nombre || !formData.correo || !formData.comentario) {
      toast({
        variant: "destructive",
        title: "Campos incompletos",
        description: "Por favor, completa todos los campos para dejar tu comentario.",
      });
      return;
    }
    setIsSubmitting(true);

    const { error } = await supabase
      .from('blog_comments')
      .insert([{
        post_id: postId,
        nombre: formData.nombre,
        correo: formData.correo,
        comentario: formData.comentario
      }]);

    if (error) {
      toast({
        variant: "destructive",
        title: "Error al enviar",
        description: "Hubo un problema al guardar tu comentario. Inténtalo de nuevo.",
      });
    } else {
      toast({
        title: "¡Comentario enviado!",
        description: "Gracias por tu comentario. Será visible una vez que sea aprobado.",
      });
      setFormData({ nombre: '', correo: '', comentario: '' });
      if (onCommentSubmitted) onCommentSubmitted();
    }
    setIsSubmitting(false);
  };

  return (
    <div className="mt-12 pt-8 border-t">
      <h3 className="text-2xl font-bold mb-6">Deja un comentario</h3>
      <form onSubmit={handleFormSubmit} className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">Nombre (*)</label>
            <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleInputChange} required className="form-input" placeholder="Tu nombre" disabled={isSubmitting} />
          </div>
          <div>
            <label htmlFor="correo" className="block text-sm font-medium text-gray-700 mb-2">Email (*)</label>
            <input type="email" id="correo" name="correo" value={formData.correo} onChange={handleInputChange} required className="form-input" placeholder="tu@email.com" disabled={isSubmitting} />
          </div>
        </div>
        <div>
          <label htmlFor="comentario" className="block text-sm font-medium text-gray-700 mb-2">Comentario (*)</label>
          <textarea id="comentario" name="comentario" value={formData.comentario} onChange={handleInputChange} required rows={5} className="form-textarea" placeholder="Escribe tu comentario aquí..." disabled={isSubmitting} />
        </div>
        <button type="submit" className="btn-primary inline-flex items-center justify-center" disabled={isSubmitting}>
          <Send className="mr-2" size={18} /> {isSubmitting ? 'Enviando...' : 'Publicar Comentario'}
        </button>
      </form>
    </div>
  );
};

const CommentsList = ({ comments }) => (
  <div className="mt-12 pt-8 border-t">
    <h3 className="text-2xl font-bold mb-6">{comments.length} Comentario{comments.length !== 1 && 's'}</h3>
    <div className="space-y-8">
      {comments.map((comment) => (
        <div key={comment.id} className="flex items-start space-x-4">
          <div className="bg-gray-200 rounded-full h-12 w-12 flex items-center justify-center font-bold text-gray-600">
            {comment.nombre.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-gray-800">{comment.nombre}</span>
              <span className="text-sm text-gray-500">{new Date(comment.created_at).toLocaleDateString()}</span>
            </div>
            <p className="text-gray-600 mt-1">{comment.comentario}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);


const BlogPostPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const post = blogPosts.find(p => p.id === postId);

  const [comments, setComments] = useState([]);

  const fetchComments = useCallback(async () => {
    if (!postId) return;
    const { data, error } = await supabase
      .from('blog_comments')
      .select('*')
      .eq('post_id', postId)
      .eq('estado', 'approved')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching comments:', error);
    } else {
      setComments(data);
    }
  }, [postId]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchComments();
  }, [postId, fetchComments]);

  const handleShare = (platform) => {
    const postUrl = window.location.href;
    const postTitle = post.title;
    const postExcerpt = post.excerpt;
    let shareUrl = '';

    switch (platform) {
      case 'X':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(postTitle)}`;
        break;
      case 'LinkedIn':
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(postUrl)}&title=${encodeURIComponent(postTitle)}&summary=${encodeURIComponent(postExcerpt)}`;
        break;
      case 'Facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  if (!post) {
    return (
      <div className="section-padding pt-32 text-center">
        <h1 className="text-4xl font-bold">Post no encontrado</h1>
        <p className="mt-4">El artículo que buscas no existe o fue movido.</p>
        <Link to="/blog" className="btn-primary mt-8 inline-block">Volver al Blog</Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post.title} - Pablo Lucero | Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image} />
        <meta property="og:type" content="article" />
      </Helmet>
      <div className="section-padding pt-32">
        <div className="container-custom max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <button onClick={() => navigate('/blog')} className="inline-flex items-center text-amber-500 font-semibold mb-8 hover:underline">
              <ArrowLeft size={18} className="mr-2" />
              Volver al Blog
            </button>

            <span className="font-semibold text-amber-600 bg-amber-100 py-1 px-3 rounded-full text-sm mb-4 inline-block">{post.category}</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>

            <div className="flex items-center text-gray-500 space-x-6 mb-8">
              <div className="flex items-center"><Calendar size={16} className="mr-2" /><span>{post.date}</span></div>
              <div className="flex items-center"><User size={16} className="mr-2" /><span>{post.author}</span></div>
            </div>

            <div className="aspect-video rounded-xl overflow-hidden mb-8 shadow-lg">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
            </div>

            <div className="prose lg:prose-xl max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: post.content }} />

            <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-4">
              <span className="font-semibold">Compartir este artículo:</span>
              <div className="flex space-x-2">
                <button onClick={() => handleShare('X')} className="social-icon"><X size={20} /></button>
                <button onClick={() => handleShare('LinkedIn')} className="social-icon"><Linkedin size={20} /></button>
                <button onClick={() => handleShare('Facebook')} className="social-icon"><Facebook size={20} /></button>
              </div>
            </div>

            {comments.length > 0 && <CommentsList comments={comments} />}
            <CommentForm postId={postId} />

          </motion.div>
        </div>
      </div>
      <NewsletterSubscribe />
    </>
  );
};

export default BlogPostPage;