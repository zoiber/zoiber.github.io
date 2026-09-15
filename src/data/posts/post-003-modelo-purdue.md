---
id: modelo-purdue-explicado-para-ingenieros
title: "Modelo Purdue explicado para ingenieros: cómo usarlo para ordenar una arquitectura industrial"
date: "14-Sep-2026"
author: "Pablo Lucero"
category: "Arquitectura Industrial"
image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1400"
excerpt: "Una explicación práctica del modelo Purdue para ordenar sistemas OT/IT, responsabilidades, flujos de información y decisiones de arquitectura industrial."
---

En automatización industrial es común comenzar resolviendo problemas puntuales.

Una máquina necesita enviar información a una base de datos. Un tablero requiere datos de producción. Un proveedor instala un sistema de monitoreo remoto. Después aparece un proyecto de OEE, un Andon, un SCADA, una solución IoT o una aplicación de trazabilidad.

Cada solución puede funcionar de manera individual. El problema aparece cuando la planta acumula equipos aislados, bases de datos distintas y conexiones que nunca fueron pensadas como parte de una arquitectura. Entonces surgen preguntas: ¿qué pertenece a OT o IT?, ¿quién es responsable de cada capa?, ¿qué ocurre si Internet o la red corporativa fallan?

En este escenario, el modelo Purdue sigue siendo una herramienta muy útil.

No porque una fábrica moderna deba reproducir literalmente todos sus niveles, sino porque proporciona algo que muchas arquitecturas industriales necesitan: orden.

Personalmente no utilizo Purdue como una arquitectura que deba implementarse exactamente como aparece en un diagrama. Lo utilizo como un marco mental para separar los sistemas de planta, entender sus responsabilidades y definir cómo deberían relacionarse entre ellos.

---

## ¿Qué es el modelo Purdue?

El modelo Purdue organiza los sistemas que participan en una operación industrial, desde el proceso físico hasta los sistemas empresariales.

De forma simplificada:

- Nivel 0: proceso físico.
- Nivel 1: control.
- Nivel 2: supervisión.
- Nivel 3: operaciones de manufactura.
- Nivel 3.5: DMZ industrial.
- Nivel 4: sistemas empresariales.
- Nivel 5: servicios externos o cloud, según la arquitectura.

Más que memorizar niveles, lo importante es comprender qué responsabilidad tiene cada capa y qué comunicaciones deberían existir entre ellas.

---

## Niveles 0 y 1: proceso y control

En el nivel 0 encontramos sensores, actuadores, motores, válvulas e instrumentos de medición. Es el punto donde el mundo físico comienza a convertirse en información.

En el nivel 1 aparecen los dispositivos responsables de controlar el proceso: PLC, controladores de robots, CNC u otros sistemas embebidos.

Su función principal es controlar la máquina, no alimentar directamente todas las aplicaciones digitales de la empresa.

Cuando una organización empieza a digitalizar sus operaciones aparece una tentación frecuente: conectar cada nueva aplicación directamente al PLC. Primero un dashboard, luego mantenimiento, después un proveedor.

Mientras el entorno es pequeño puede funcionar. Cuando empieza a crecer, la arquitectura se vuelve difícil de mantener.

Purdue ayuda a formular una pregunta sencilla:

¿Realmente todos esos sistemas deberían conectarse directamente con el PLC?

Muchas veces, la respuesta es no.

---

## Nivel 2: supervisión

En el nivel 2 encontramos HMI, SCADA y estaciones de operación.

Una HMI permite visualizar estados y alarmas. Un SCADA puede consolidar información de varias máquinas. Aquí el dato empieza a adquirir contexto: una señal deja de ser solamente `TRUE` o `FALSE` y puede representar una máquina detenida, una línea produciendo o una orden en ejecución.

---

## Nivel 3: cuando el dato se convierte en gestión

El nivel 3 es especialmente relevante para transformación digital industrial.

Aquí aparecen sistemas como:

- OEE,
- Andon,
- tableros digitales de producción,
- seguimiento hora a hora,
- historian,
- trazabilidad,
- aplicaciones de calidad.

Estos sistemas ya no controlan directamente la máquina. Utilizan información del proceso para gestionar producción.

Un OEE convierte señales en indicadores, un Andon utiliza eventos para gestionar llamados y un tablero hora a hora combina producción real con objetivos. Aquí el dato industrial comienza a convertirse en información para tomar decisiones.

---

## Nivel 4: sistemas empresariales

En el nivel 4 encontramos ERP, SAP, planificación, inventarios, compras, finanzas y plataformas analíticas corporativas.

Uno de los errores frecuentes es asumir que una integración tiene valor simplemente porque técnicamente es posible realizarla.

Conectar un SCADA con SAP puede parecer interesante, pero antes deberíamos preguntar:

> ¿Qué problema estamos resolviendo con esta integración?

Una integración debería reducir registros manuales, mejorar trazabilidad, disminuir errores o acelerar decisiones.

Si no existe un beneficio claro, probablemente estamos agregando complejidad tecnológica sin generar valor equivalente.

Integrar por integrar no es transformación digital.

---

## El problema de crecer sin arquitectura

Muchas plantas industriales no fueron diseñadas como una arquitectura digital integral. Fueron creciendo proyecto por proyecto.

Una máquina utiliza SQL Server, otra MySQL y un proveedor instala Oracle. Después cada sistema necesita datos del otro. El resultado son conexiones punto a punto, scripts y consultas difíciles de rastrear. El problema no es utilizar tecnologías distintas, sino no tener una arquitectura que explique cómo deberían convivir.

Cuando resulta difícil dibujar cómo viaja un dato desde una máquina hasta los sistemas corporativos, probablemente existe deuda arquitectónica.

---

## Soporte remoto y riesgo de ciberseguridad

Otro escenario frecuente aparece con los proveedores.

Es común encontrar routers, gateways IoT, conexiones celulares, VPN o plataformas cloud instaladas para soporte remoto.

Puede ser práctico para el proveedor, pero riesgoso para la organización si un dispositivo de planta se conecta directamente con servicios externos o bases de datos corporativas sin pasar por controles internos. Así puede aparecer un camino directo entre OT y la nube del proveedor, perdiendo visibilidad sobre accesos y datos.

Purdue ayuda a cuestionar estas conexiones y recuerda que IT y OT no deberían mezclarse indiscriminadamente.

---

## Nivel 3.5: la DMZ industrial

La DMZ industrial es una de las piezas que considero más importantes en una arquitectura moderna.

Su función es crear una zona intermedia entre IT y OT.

En lugar de permitir conexiones directas desde la red corporativa hacia los sistemas de control, determinados servicios pueden ubicarse en esta zona y actuar como punto controlado de intercambio.

Esto mejora la seguridad y también protege la disponibilidad de planta.

IT y OT tienen prioridades distintas: una intervención aceptable en IT puede afectar producción en OT. Separar ambos entornos permite aplicar políticas diferentes sin perder la posibilidad de integrarlos.

---

## ¿Purdue sigue teniendo sentido con MQTT, UNS, edge y cloud?

Las arquitecturas industriales actuales ya no siguen siempre un flujo estrictamente jerárquico.

Tecnologías como MQTT, Sparkplug B, OPC UA, edge computing o Unified Namespace permiten distribuir información de una forma mucho más flexible.

Una máquina puede publicar información consumida por producción, mantenimiento, calidad o analítica. Esto rompe parcialmente la visión tradicional de un flujo estrictamente vertical, pero no vuelve obsoleto a Purdue.

Para mí, la alternativa más interesante es una arquitectura híbrida.

Purdue puede continuar utilizándose para separar zonas, proteger OT y definir responsabilidades. Al mismo tiempo, tecnologías modernas pueden desacoplar el movimiento de información.

Un Unified Namespace permite que distintos consumidores accedan a datos contextualizados sin conectarse directamente con cada PLC. Parte de esta infraestructura puede ubicarse alrededor de la capa 3.5. No se trata de abandonar Purdue, sino de complementarlo.

---

## Tres principios que intento proteger

### 1. Evitar dependencia excesiva del proveedor

Una solución no debería convertirse en una caja negra imposible de mantener sin la presencia permanente del proveedor.

La organización debe conocer cómo funciona, cómo se integra y dónde almacena información. El proveedor puede ser un aliado, pero la empresa debe mantener control sobre su arquitectura.

### 2. Mantener disponibilidad local

Si Internet o la red corporativa fallan, los sistemas críticos de planta deberían continuar operando siempre que el proceso lo permita.

### 3. Diseñar pensando en escalabilidad y ciberseguridad

Una PoC puede conectar algunas variables de un PLC directamente a una aplicación. La pregunta es qué ocurrirá con cincuenta máquinas. Además, cada integración debería analizar accesos, segmentación, conexiones remotas y exposición de servicios.

La ciberseguridad debe formar parte del diseño desde el inicio.

---

## Cómo utilizar Purdue en un proyecto real

No recomiendo comenzar intentando clasificar obsesivamente cada dispositivo dentro de un nivel.

Prefiero empezar con preguntas:

- ¿Qué equipos controlan el proceso?
- ¿Qué sistemas supervisan las máquinas?
- ¿Qué aplicaciones gestionan la operación?
- ¿Qué información necesita el negocio?
- ¿Qué conexiones existen entre IT y OT?
- ¿Qué proveedores tienen acceso remoto?
- ¿Qué sistemas deben seguir funcionando si Internet falla?

Después podemos utilizar Purdue para ordenar las respuestas.

El resultado puede ser un diagrama sencillo para discutir arquitectura entre automatización, producción, IT, ciberseguridad y proveedores, y definir responsabilidades sobre PLC, SCADA, DMZ y accesos externos.

---

## Conclusión

El modelo Purdue fue creado en un contexto industrial diferente al actual.

Hoy hablamos de cloud, edge computing, MQTT, Unified Namespace, APIs e inteligencia artificial.

Por eso intentar reproducir literalmente una arquitectura jerárquica clásica puede no ser la mejor estrategia.

Pero descartarlo por considerarlo antiguo también sería un error.

Sus principios siguen ayudando a separar IT y OT, definir responsabilidades, segmentar la infraestructura, reducir conexiones innecesarias y proteger sistemas críticos.

La forma en que prefiero utilizarlo puede resumirse así:

> Toma el modelo Purdue como un marco referencial para separar tus equipos y sistemas de planta, asignar responsabilidades claras y controlar cómo fluye la información entre OT e IT.

Después adapta la arquitectura a las necesidades reales de la organización.

Puedes incorporar MQTT, Unified Namespace, edge computing o servicios cloud, pero hazlo sobre una arquitectura consciente, documentada y gobernada.

Porque la transformación digital industrial no consiste simplemente en conectar más equipos.

Consiste en construir una infraestructura que permita conectarlos sin perder el control sobre ellos.

