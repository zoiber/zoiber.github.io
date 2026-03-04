---
id: paskana-post-13-vectores-ataque-ot
title: "Los 7 vectores de ataque más comunes en fábricas y cómo prevenirlos"
date: "2-Ene-2026"
author: "Pablo Lucero"
category: "Ciberseguridad OT"
image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
excerpt: "Las redes OT ya no están aisladas. Hoy conviven PLC, SCADA, MES y ERP conectados a la nube, acceso remoto y servicios externos. Esa conectividad abre la puerta a nuevos vectores de ataque que afectan directamente la seguridad de las personas, la calidad del producto y la continuidad operativa.\n\nEn este post revisamos los siete vectores de ataque más frecuentes en fábricas y, sobre todo, cómo aterrizar controles prácticos en planta para reducir el riesgo sin frenar la operación."
---

Las redes OT ya no están aisladas. Hoy conviven PLC, SCADA, MES y ERP conectados a la nube, acceso remoto y servicios externos. Esa conectividad abre la puerta a nuevos vectores de ataque que afectan directamente la seguridad de las personas, la calidad del producto y la continuidad operativa.

En este post revisamos los siete vectores de ataque más frecuentes en fábricas y, sobre todo, cómo aterrizar controles prácticos en planta para reducir el riesgo sin frenar la operación.

### Por qué hablar de vectores de ataque en planta

Un vector de ataque es el camino que usa un atacante para entrar a tus sistemas y moverse hasta los activos críticos. No es solo la vulnerabilidad técnica, sino la combinación de tecnología, configuración y comportamiento humano que abre la puerta al incidente. Conceptos generales de ciberseguridad coinciden en que entender estos caminos es la base para reducir el riesgo, más allá de instalar “otra herramienta más”. Puedes ver esta idea en definiciones como la de IBM sobre vectores de ataque, que destacan precisamente esta noción de “ruta de entrada” al sistema [en este artículo](https://www.ibm.com/think/topics/attack-vector).

En el mundo industrial, los avisos y recomendaciones recientes para ICS/OT muestran patrones que se repiten: equipos expuestos a internet, credenciales débiles en VPN, segmentación pobre entre TI y OT y dispositivos portátiles sin control que llevan malware directo al corazón de la planta. Basta revisar los resúmenes de avisos ICS de CISA en 2025 para ver que muchas vulnerabilidades explotan exactamente estas puertas mal protegidas [en este resumen](https://socradar.io/blog/cisa-industrial-control-systems-ics-advisories-2025/).

La buena noticia es que, aunque no puedas eliminar todas las amenazas, sí puedes cerrar la mayoría de los vectores de ataque más usados por delincuentes y actores avanzados. La clave está en priorizar controles realistas en función del riesgo y de la madurez de tu planta.

### 1. Conexiones OT expuestas a internet y VPN mal gestionadas

En muchas fábricas, el primer vector de ataque es también el más obvio: equipos OT con acceso directo desde internet o VPN mal configuradas. Un PLC con puerto web abierto, un servidor SCADA publicado para “consultas rápidas” o una VPN con credenciales débiles se convierten en la puerta principal para un atacante.

Organismos como CISA insisten en que la primera medida para proteger OT es eliminar conexiones directas a internet y endurecer todo acceso remoto que sea estrictamente necesario, incluyendo VPN y túneles hacia la red de control, como se recoge en su ficha de mitigaciones primarias para OT [disponible aquí](https://www.cisa.gov/resources-tools/resources/primary-mitigations-reduce-cyber-threats-operational-technology) y en sus guías sobre seguridad de VPN.

En planta esto se traduce en acciones muy concretas: validar qué equipos OT realmente necesitan acceso remoto, pasar el resto a redes privadas o DMZ industrial, usar VPN con autenticación multifactor y mantenerlas actualizadas. Además, es clave registrar y monitorear todo acceso remoto, de personal interno y de proveedores.

### 2. Phishing al personal de planta y movimiento lateral desde TI

Muchos ataques a ICS no empiezan en OT, sino en la red corporativa. Un correo de phishing, una credencial robada o un equipo de oficina comprometido permiten al atacante entrar por TI y, desde ahí, moverse lateralmente hasta los servidores de ingeniería o los enlaces hacia la red de control.

Organismos de ciberseguridad han documentado escenarios en los que los atacantes comprometen usuarios de oficina a través de phishing o adjuntos maliciosos, obtienen acceso remoto y despliegan ransomware en la red de control, bloqueando HMIs y servidores SCADA. Ejemplos de este patrón aparecen en guías y casos compartidos por centros nacionales de ciberseguridad dedicados a ICS [como este escenario ilustrativo](https://www.ncsc.gov.bh/en/cyberwiser/ics.html).

Para un ingeniero de planta, esto significa que la seguridad OT no termina en el PLC. Debes exigir campañas de concienciación específicas para personal que interactúa con sistemas de control, configurar filtros de correo que bloqueen adjuntos ejecutables y, sobre todo, diseñar la red para que un incidente en TI no pueda saltar fácilmente a OT. Segmentar directorios activos, separar cuentas de administración y restringir fuertemente quién puede llegar a los servidores de ingeniería es tan importante como cualquier antivirus.

### 3. Dispositivos USB y portátiles de terceros entrando a la red OT

Los USB siguen siendo uno de los vectores más subestimados en entornos industriales. Informes específicos sobre amenazas USB en ICS muestran que estos dispositivos han sido el segundo vector de entrada más frecuente en ataques dirigidos a sistemas de control, transportando malware como Industroyer, TRITON o variantes de ransomware industrial [según el USB Threat Report de Honeywell](https://discover.honeywell.com/rs/252-ZVX-735/images/USB-Threat-Report.pdf).

Estudios y análisis recientes estiman que una proporción significativa de ataques de ransomware comienza con medios removibles infectados, lo que convierte al USB en un vector crítico cuando se conecta directamente a estaciones de ingeniería, HMIs o portátiles de mantenimiento [como recuerda esta guía sobre ransomware y USB en ICS](https://www.tyrex-cyber.co.uk/industrial-control-systems/).

Las contramedidas prácticas incluyen establecer políticas claras de uso de USB en planta, habilitar soluciones de control de dispositivos que sólo permitan medios autorizados, crear estaciones de escaneo dedicadas para analizar cualquier archivo recibido de proveedores y exigir que los portátiles de contratistas pasen por una zona de cuarentena o VLAN específica antes de acercarse a la red OT.

### 4. Sistemas OT legados y sin parches

Otro vector clásico en fábricas es la explotación de vulnerabilidades conocidas en sistemas operativos antiguos, software SCADA sin soporte o firmware de PLC desactualizado. Muchos estudios sobre ciberataques en sectores como petróleo y gas evidencian que la falta de parcheo y el uso de software legado se mantienen entre las principales debilidades de ICS desde hace años, especialmente cuando se combinan con redes no segmentadas.

En la práctica, esto no se resuelve con una simple orden de “actualizar todo”, porque la realidad de planta tiene ventanas de mantenimiento limitadas, equipos críticos sin redundancia y aplicaciones que no siempre soportan la última versión. La estrategia realista pasa por construir un inventario de activos confiable, clasificar los equipos según criticidad y exposición, priorizar parches de alto impacto y, cuando no se puede actualizar, aplicar controles compensatorios como segmentación más estricta, listas blancas de comunicación o virtual patching a través de firewalls de nueva generación.

### 5. Redes planas y poca segmentación entre TI y OT

La red “plana” donde todo se ve con todo es el sueño de un atacante. Si un intruso consigue acceso a un único punto, puede escanear la red, descubrir PLC, HMIs, historizadores y moverse hasta los sistemas más sensibles sin demasiada resistencia.

Los marcos modernos de ciberseguridad OT, como la serie ISA/IEC 62443, insisten en el diseño por zonas y conductos, con niveles de seguridad diferenciados, controlando quién puede hablar con quién y bajo qué condiciones. Esta serie de normas se ha consolidado como referencia para asegurar sistemas de automatización industrial en todo su ciclo de vida [según la propia ISA](https://www.isa.org/standards-and-publications/isa-standards/isa-iec-62443-series-of-standards) y análisis recientes de proveedores especializados en ICS [como Claroty](https://claroty.com/blog/what-is-the-isa-iec-62443-framework).

En una planta, esto se traduce en segmentar capas de red siguiendo modelos como Purdue, colocar firewalls industriales entre TI y OT, e incluso entre celdas de la propia red de control, y definir reglas de tráfico muy concretas: qué protocolo, desde qué origen, hacia qué destino y en qué horario. Sin segmentación, cualquier otro control pierde eficacia.

### 6. Acceso remoto de proveedores y servicios IIoT mal gestionados

Cada vez más equipos llegan con acceso remoto “out of the box” para soporte, actualización o monitoreo en la nube: desde compresores hasta robots y sistemas de visión. Si estos canales no se gestionan como activos críticos, se convierten en un vector ideal para un atacante que comprometa la cuenta del proveedor o un servicio intermedio.

Diversas guías de mejores prácticas para OT recomiendan tratar cualquier acceso remoto de terceros como un riesgo de alto impacto: registrar y aprobar quién puede conectar, exigir autenticación fuerte, usar jump servers en DMZ industrial, grabar sesiones y deshabilitar accesos por defecto cuando no se utilizan.

En planta, un buen primer paso es hacer un inventario de todos los equipos que “llaman a casa” o que ofrecen acceso remoto de fábrica, revisar con los proveedores cómo se autentican y cerrar cualquier canal que no sea esencial. Luego, para los accesos que se mantengan, moverlos a un esquema controlado de acceso remoto centralizado.

### 7. Cadena de suministro y software de ingeniería comprometido

El último vector de esta lista no ocurre dentro de tu planta, sino antes: en la cadena de suministro de software y equipos. Paquetes de actualización alterados, proyectos de PLC manipulados o imágenes de máquinas comprometidas por terceros pueden introducir backdoors o lógica maliciosa en tus sistemas sin que lo notes al principio.

La discusión reciente sobre ciberseguridad en entornos industriales subraya que las amenazas ya no sólo vienen de la red corporativa, sino también de la cadena de suministro, las conexiones remotas y los dispositivos inteligentes distribuidos en campo [como explica este artículo introductorio](https://novesh.com/blog/novesh-blog-7/understanding-iec-62443-importance-compliance-28).

Para mitigar este vector, es clave exigir a los proveedores prácticas de desarrollo seguro, verificar firmas digitales de firmware y software, controlar cuidadosamente quién puede importar proyectos a PLC y SCADA y mantener una gestión de cambios disciplinada.

### Conclusión: seguridad OT como disciplina de ingeniería

Cuando analizas incidentes reales en fábricas, rara vez encuentras un ataque “mágico” o hiper sofisticado. Lo que se repite son combinaciones de vectores de ataque muy conocidos: una VPN débil, un USB sin control, una red plana, un servidor SCADA sin parches.

Para un ingeniero de planta, el mensaje es claro. No se trata de memorizar mil CVEs, sino de entender cómo se conectan tus sistemas, qué caminos podrían usar los atacantes para llegar a ellos y qué controles puedes aplicar, paso a paso, sin detener la producción.

La seguridad OT no es un proyecto puntual, es una disciplina que debe evolucionar junto con la automatización, la analítica y la integración con el negocio.

### Recibe la guía extendida de seguridad OT

Si quieres profundizar en estos siete vectores con listas de chequeo, ejemplos de arquitectura y plantillas para evaluar el riesgo en tu planta, he preparado una guía extendida de seguridad OT orientada a ingenieros de planta.

Déjame tu correo corporativo mediante un mensaje y te enviaré la guía completa, con recomendaciones priorizadas y un roadmap práctico para empezar a cerrar brechas desde hoy, aunque todavía no tengas un gran presupuesto de ciberseguridad industrial.
