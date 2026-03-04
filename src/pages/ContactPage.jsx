import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Mail, MapPin, Linkedin } from 'lucide-react';

const ContactPage = () => {
  const contactInfo = [
    {
      id: 'email',
      label: 'EMAIL',
      value: 'plucero@paskanai.com',
      icon: <Mail size={24} />,
      link: 'mailto:plucero@paskanai.com'
    },
    {
      id: 'ubicacion',
      label: 'UBICACIÓN',
      value: 'Cuenca, Ecuador',
      icon: <MapPin size={24} />,
      link: null
    },
    {
      id: 'linkedin',
      label: 'LINKEDIN',
      value: 'pablo-lucero-ec',
      icon: <Linkedin size={24} />,
      link: 'https://www.linkedin.com/in/pablo-lucero-ec/'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Contacto - Pablo Lucero | Hablemos de Transformación Digital</title>
        <meta name="description" content="¿Tienes algún proyecto en mente o te interesa conversar sobre transformación digital e industria 4.0? Estaré encantado de conectar." />
      </Helmet>

      <div className="section-padding pt-32 min-h-[80vh] flex items-center">
        <div className="container-custom max-w-5xl">
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-2xl md:text-3xl lg:text-3xl text-gray-700 leading-relaxed max-w-5xl">
              ¿Tienes algún proyecto en mente o te interesa conversar sobre transformación digital e industria 4.0? Estaré encantado de conectar.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-y-12 gap-x-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.id}
                className="flex items-center space-x-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="bg-gray-50 p-4 rounded-full flex items-center justify-center text-gray-900">
                  {info.icon}
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                    {info.label}
                  </p>
                  {info.link ? (
                    <a
                      href={info.link}
                      target={info.id === 'linkedin' ? "_blank" : "_self"}
                      rel={info.id === 'linkedin' ? "noopener noreferrer" : ""}
                      className="text-xl md:text-2xl font-bold text-gray-900 hover:text-amber-500 transition-colors"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-xl md:text-2xl font-bold text-gray-900">
                      {info.value}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;