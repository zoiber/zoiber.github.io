import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Download } from 'lucide-react';
import { resources } from '@/data/resources/resources';

const ResourcesPage = () => {
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
                  <Link to={`/recursos/${resource.id}`} className="btn-primary inline-flex items-center justify-center mt-auto">
                    <Download className="mr-2" size={18} /> Descargar ahora
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ResourcesPage;