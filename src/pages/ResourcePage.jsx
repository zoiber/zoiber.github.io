import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, FileText, CheckCircle } from 'lucide-react';
import { resources } from '@/data/resources/resources';
import { useToast } from '@/components/ui/use-toast';

const ResourcePage = () => {
  const { resourceId } = useParams();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const resource = resources.find((r) => r.id === resourceId);

  if (!resource) {
    return (
      <div className="section-padding pt-32 text-center min-h-screen">
        <h1 className="text-3xl font-bold mb-4">Recurso no encontrado</h1>
        <Link to="/recursos" className="btn-primary mt-8 inline-block">Volver a Recursos</Link>
      </div>
    );
  }

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
        <title>{resource.title} - Pablo Lucero</title>
        <meta name="description" content={resource.description} />
      </Helmet>
      <div className="section-padding pt-32 bg-gray-50 min-h-screen">
        <div className="container-custom max-w-2xl">
          <Link to="/recursos" className="inline-flex items-center text-amber-500 font-semibold mb-8 hover:underline">
            <ArrowLeft size={18} className="mr-2" /> Volver a Recursos
          </Link>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <img className="w-full h-64 object-cover" alt={resource.title} src={resource.image} />
            <div className="p-8">
              <span className="font-semibold text-amber-600 bg-amber-100 py-1 px-2 rounded-full text-xs">{resource.type}</span>
              <h1 className="font-bold text-3xl mt-4 mb-3">{resource.title}</h1>
              <p className="text-gray-600 mb-8">{resource.description}</p>
              <FileText className="w-12 h-12 mx-auto mb-4 text-amber-500" />
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
          </div>
        </div>
      </div>
    </>
  );
};

export default ResourcePage;
