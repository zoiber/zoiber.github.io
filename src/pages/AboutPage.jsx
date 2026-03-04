import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Award, Zap, Shield, Cpu, BarChart3, CheckCircle } from 'lucide-react';
const AboutPage = () => {
  const specializations = [{
    icon: <Zap />,
    text: 'Transformación Digital Industrial'
  }, {
    icon: <Cpu />,
    text: 'IIoT y Sistemas SCADA'
  }, {
    icon: <Shield />,
    text: 'Ciberseguridad Industrial (OT)'
  }, {
    icon: <BarChart3 />,
    text: 'Inteligencia Artificial y Machine Learning'
  }];
  const testimonials = [{
    quote: "Desarrollo de algoritmos de machine learning para la detección de fallos en maquinaría rotativa.",
    name: "Grupo de Investigación y Desarrollo en Tecnologías Industriales (GIDTEC), Cuenca, Ecuador",
    logo: "https://imagedelivery.net/LqiWLm-3MGbYHtFuUbcBtA/119580eb-abd9-4191-b93a-f01938786700/public"
  }];
  return <>
    <Helmet>
      <title>Acerca de - Pablo Lucero | Experto en Transformación Digital</title>
      <meta name="description" content="Tu punto de apoyo en el viaje hacia la transformación digital. Conoce mi trayectoria, experiencia y especialización en transformación digital industrial, IIoT, ciberseguridad y más." />
    </Helmet>
    <div className="section-padding pt-32">
      <div className="container-custom">
        <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5
        }}>
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-2">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Sobre mí</h1>
              <p className="text-xl text-gray-600 mb-6">
                Soy un ingeniero apasionado por la convergencia entre tecnología e industria. Durante más de 9 años de trayectoria he combinado la investigación académica con la aplicación práctica de proyectos tecnológicos en la industria de manufactura.
              </p>
              <h2 className="text-3xl font-bold mb-6 mt-8">Formación e investigación</h2>
              <p className="text-lg text-gray-600 mb-4">
                Inicié mi camino profesional en la Universidad Politécnica Salesiana (UPS), donde trabajé durante 3 años en el Grupo de investigación y Desarrollo en Tecnologías Industriales (<a href="https://pure.ups.edu.ec/es/organisations/group-for-research-and-development-in-industrial-technologies-gid" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">GIDTEC</a>) desarrollando algoritmos de machine learning para el diagnóstico de fallos en maquinaria rotativa.
              </p>
              <p className="text-lg text-gray-600 mb-4">
                Posteriormente me especialicé con un Máster en Lógica, Computación e Inteligencia Artificial en la Universidad de Sevilla (España), lo que me permitió profundizar en el desarrollo de modelos inteligentes aplicados a diferentes entornos de la vida real.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Puedes revisar mis publicaciones académicas en mi perfil de <a href="https://scholar.google.com/citations?user=pmEmV9oAAAAJ&hl=es" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Scholar</a>.
              </p>

              <h2 className="text-3xl font-bold mb-6">Experiencia en la industria</h2>
              <p className="text-lg text-gray-600 mb-4">
                Desde hace 6 años formo parte de Indurama, empresa líder en la fabricación de electrodomésticos en Ecuador. Allí he transitado desde el área de Automatización hasta liderar proyectos en Innovación y Transformación Digital Industrial.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                He gestionado e implementado soluciones que abarcan desde sistemas SCADA, Andon, OEE, consumo energético, hasta arquitecturas de datos industriales (UNS, IIoT, DataOps), con un enfoque en eficiencia, sostenibilidad y generación de valor para la organización.
              </p>

              <h2 className="text-3xl font-bold mb-6">Misión profesional</h2>
              <p className="text-lg text-gray-600 mb-8">
                Mi propósito es ser un puente entre el mundo digital y el mundo industrial para impulsar la competitividad, la innovación y la sostenibilidad en la manufactura.
              </p>
              <h2 className="text-3xl font-bold mb-6">Áreas de interés</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {specializations.map((spec, index) => <div key={index} className="flex items-center bg-gray-50 p-4 rounded-lg">
                  <div className="text-amber-500 mr-4">{spec.icon}</div>
                  <span className="font-medium">{spec.text}</span>
                </div>)}
              </div>
            </div>
            <div className="text-center">
              <div className="relative inline-block">
                <img src="https://horizons-cdn.hostinger.com/548fedfe-7225-48e8-bdb6-2ae822f793ee/whatsapp-image-2025-09-21-at-10.52.16-pm-9lA2C.jpeg" alt="Foto profesional de Pablo Lucero" className="rounded-full w-48 h-48 md:w-64 md:h-64 object-cover mx-auto shadow-lg" />
                <div className="absolute bottom-2 right-2 bg-amber-500 p-3 rounded-full text-white shadow-md">
                  <Award size={24} />
                </div>
              </div>
              <h3 className="text-2xl font-bold mt-6">Pablo Lucero</h3>
              <p className="text-gray-500">Especialista en Industria 4.0</p>
            </div>
          </div>
        </motion.div>

        <motion.div className="mt-24" initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }} viewport={{
          once: true
        }}>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Colaboraciones y Testimonios</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => <div key={index} className="testimonial-card text-center">
              <img src={testimonial.logo} alt="Logo de empresa" className="h-12 mx-auto mb-4 filter grayscale opacity-60" />
              <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
              <p className="font-semibold text-gray-800">{testimonial.name}</p>
            </div>)}
          </div>
        </motion.div>
      </div>
    </div>
  </>;
};
export default AboutPage;