import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';

const NewsletterSubscribe = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);

    const { data, error } = await supabase
      .from('subscribers')
      .insert([{ email: email }])
      .select();

    setLoading(false);

    if (error) {
      if (error.code === '23505') { // Unique constraint violation
        toast({
          title: "Ya estás suscrito",
          description: "Tu correo electrónico ya está en nuestra lista.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Error en la suscripción",
          description: "Hubo un problema al guardar tu correo. Por favor, inténtalo de nuevo.",
          variant: "destructive"
        });
      }
    } else {
      toast({
        title: "¡Suscripción exitosa!",
        description: "Gracias por suscribirte. Tu correo ha sido guardado en la nube.",
      });
      setEmail('');
    }
  };

  return (
    <section className="section-padding bg-gray-900 text-white">
      <div className="container-custom">
        <motion.div 
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Recibe las mejores ideas sobre <span className="text-gradient">transformación digital</span>
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Únete a mi comunidad y recibe análisis, casos de éxito y recursos directamente en tu correo. Sin spam, solo contenido de valor.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <div className="relative flex-grow">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Tu correo electrónico"
                required
                disabled={loading}
                className="form-input bg-gray-800 border-gray-700 text-white w-full pl-12"
              />
            </div>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Suscribiendo...' : 'Suscribirme'}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSubscribe;