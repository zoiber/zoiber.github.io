import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Download, FileText, CheckCircle } from 'lucide-react';
import { resources } from '@/data/resources';
import { useToast } from '@/components/ui/use-toast';

const ResourcesPage = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleDownload = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      toast({
        title: "¡Gracias por tu interés!",
        description: "El recurso se ha enviado a tu correo electrónico.",
        duration: 5000,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Por favor, introduce un correo electrónico válido.",
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Recursos - Pablo Lucero | Plantillas y Whitepapers</title>
        <meta name="description" content="Tu punto de apoyo en el viaje hacia la transformación digital. Descarga plantillas, whitepapers y checklists gratuitos sobre transformación digital industrial." />
      </Helmet>
      <div className="section-padding pt-32 bg-gray-50">
        <div className="container-custom">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Recursos <span className="text-gradient">Exclusivos</span></h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Herramientas prácticas para acelerar tu viaje en la transformación digital.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resources.map((resource, index) => (
              <motion.div key={resource.id} className="project-card" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }}>
                <div className="h-48 overflow-hidden">
                  <img className="w-full h-full object-cover" alt={resource.title} src={resource.image} />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <span className="font-semibold text-amber-600 bg-amber-100 py-1 px-2 rounded-full text-xs mb-3 self-start">{resource.type}</span>
                  <h3 className="text-xl font-semibold mb-3">{resource.title}</h3>
                  <p className="text-gray-600 mb-4 flex-grow">{resource.description}</p>
                  <button onClick={() => document.getElementById(`dialog-${resource.id}`).showModal()} className="btn-primary inline-flex items-center justify-center mt-auto">
                    <Download className="mr-2" size={18} /> Descargar ahora
                  </button>
                </div>
                <dialog id={`dialog-${resource.id}`} className="modal p-0 rounded-xl shadow-2xl max-w-md w-full">
                  <div className="modal-box p-8">
                    <form method="dialog">
                      <button className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4">✕</button>
                    </form>
                    <FileText className="w-12 h-12 mx-auto mb-4 text-amber-500" />
                    <h3 className="font-bold text-2xl text-center mb-2">{resource.title}</h3>
                    <p className="text-center text-gray-600 mb-6">Introduce tu correo para recibir el recurso y suscribirte a mi newsletter.</p>
                    {subscribed ? (
                      <div className="text-center p-4 bg-green-100 text-green-800 rounded-lg">
                        <CheckCircle className="inline-block mr-2" />
                        ¡Enviado! Revisa tu bandeja de entrada.
                      </div>
                    ) : (
                      <form onSubmit={handleDownload} className="space-y-4">
                        <input type="email" placeholder="tu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="form-input" required />
                        <button type="submit" className="btn-primary w-full">Descargar y Suscribirme</button>
                      </form>
                    )}
                  </div>
                </dialog>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ResourcesPage;