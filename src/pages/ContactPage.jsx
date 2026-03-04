import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Send, Calendar, Linkedin, X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

const ContactPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('blog_messages')
        .insert([
          { nombre: formData.name, correo: formData.email, mensaje: formData.message }
        ]);

      if (error) {
        console.error('Error submitting contact form:', error);
        toast({
          variant: "destructive",
          title: "Error al enviar",
          description: "Hubo un problema al guardar tu mensaje. Por favor, inténtalo de nuevo.",
          duration: 5000,
        });
      } else {
        toast({
          title: "¡Mensaje enviado!",
          description: "Gracias por contactarme. Te responderé pronto.",
          duration: 5000,
        });
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      toast({
        variant: "destructive",
        title: "Error inesperado",
        description: "Ocurrió un error inesperado. Por favor, verifica tu conexión.",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <Helmet>
        <title>Contacto - Pablo Lucero | Hablemos de Transformación Digital</title>
        <meta name="description" content="Tu punto de apoyo en el viaje hacia la transformación digital. Contacta conmigo para colaboraciones, consultorías o para agendar una llamada sobre transformación digital industrial." />
      </Helmet>
      <div className="section-padding pt-32">
        <div className="container-custom">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Hablemos</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">¿Tienes un proyecto en mente, una pregunta o simplemente quieres conectar? Estoy a tu disposición.</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <motion.div className="contact-form" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <h3 className="text-2xl font-semibold mb-6">Envíame un mensaje</h3>
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required className="form-input" placeholder="Tu nombre" disabled={isSubmitting} />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required className="form-input" placeholder="tu@email.com" disabled={isSubmitting} />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Mensaje</label>
                  <textarea id="message" name="message" value={formData.message} onChange={handleInputChange} required rows={5} className="form-textarea" placeholder="¿En qué puedo ayudarte?" disabled={isSubmitting} />
                </div>
                <button type="submit" className="btn-primary w-full inline-flex items-center justify-center" disabled={isSubmitting}>
                  <Send className="mr-2" size={18} /> {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                </button>
              </form>
            </motion.div>

            <motion.div className="space-y-8" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <Dialog>
                <DialogTrigger asChild>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-2xl font-semibold mb-4">Agendar una llamada</h3>
                    <p className="text-gray-600 mb-4">Si prefieres una conversación directa, podemos agendar una videollamada de 15 minutos.</p>
                    <button className="btn-secondary w-full inline-flex items-center justify-center">
                      <Calendar className="mr-2" size={18} /> Ver mi disponibilidad
                    </button>
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] md:max-w-2xl lg:max-w-4xl bg-white">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-center">Agenda una llamada</DialogTitle>
                    <DialogDescription className="text-center text-gray-600 px-4">
                      Agenda una primera llamada breve para conversar sobre tus necesidades digitales. Selecciona una fecha y hora disponible en el calendario para reservar tu espacio. Este proceso es sencillo y rápido, solo elige el momento que más te convenga y confirma tu cita.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="mt-4" style={{ position: 'relative', paddingBottom: '75%', height: 0, overflow: 'hidden' }}>
                    <iframe
                      src="https://calendar.app.google/UHRMFjhjZo5R2Now6"
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                      allowFullScreen
                      title="Calendario de Google"
                    ></iframe>
                  </div>
                </DialogContent>
              </Dialog>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-2xl font-semibold mb-4">Conecta en redes</h3>
                <p className="text-gray-600 mb-4">Sígueme en mis redes profesionales para contenido diario y discusiones sobre la industria.</p>
                <div className="flex space-x-4">
                  <button onClick={() => handleSocialClick('https://www.linkedin.com/in/pablo-lucero-ec/')} className="social-icon flex-1 justify-center"><Linkedin className="mr-2" size={20} /> LinkedIn</button>
                  <button onClick={() => handleSocialClick('https://x.com/PabloLuceroEC')} className="social-icon flex-1 justify-center"><X className="mr-2" size={20} /> X</button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;