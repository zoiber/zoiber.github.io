---
id: icc-2026-ignition-community-conference-del-dato-a-la-decision
title: "ICC 2026: del dato a la decisión. Lo que dejó la Ignition Community Conference"
date: "11-Oct-2026"
author: "Pablo Lucero"
category: "Eventos e Industria 4.0"
image: "/images/posts/post-004-icc-2026-ignition-community-conference/00-portada.jpg"
excerpt: "Síntesis de 17 sesiones y del ecosistema de proveedores del ICC 2026: contexto de datos, eventos, IA con evidencia, cierre del ciclo hasta la acción y adopción a escala."
---

La Ignition Community Conference (ICC) suele describirse como un evento sobre una plataforma. Después de revisar 17 sesiones y los materiales de 13 proveedores del ICC 2026, mi lectura es otra: fue una conferencia sobre qué hace falta para que un dato industrial termine en una decisión.

No hablo de capturar más señales. Eso ya lo sabemos hacer. Hablo de que una lectura de un tag, por sí sola, no explica nada. Necesita identidad, contexto, tiempo y alguien o algo que actúe sobre ella.

En este artículo resumo los temas que más se repitieron, cómo se conectan entre sí y qué preguntas me llevo para evaluar proyectos reales.

> Nota de alcance: las cifras y resultados citados provienen de las presentaciones y del material de cada proveedor o cliente. No son estimaciones de beneficio para otra planta ni una validación independiente.

---

## El hilo conductor: de capturar señales a entender el estado de la operación

Si hubiera que resumir el ICC 2026 en una frase sería esta:

> Elige una decisión concreta, crea un dato confiable y contextualizado, mide si la acción resultante mejora el proceso y después estandariza lo que funcionó.

Las sesiones se complementaban como eslabones de una misma cadena:

1. **Conectar** activos y registros, nuevos y legados.
2. **Interpretar** eventos y relacionarlos con el proceso.
3. **Analizar**, con apoyo de IA, reduciendo el tiempo de investigación.
4. **Actuar**: una decisión, un aviso o una orden de trabajo.
5. **Escalar y sostener** lo que funcionó.

Veamos cada eslabón.

---

## 1. Datos y contexto: un tag aislado no es una explicación

Varias charlas, desde enfoques distintos, llegaron a la misma conclusión: la jerarquía de tags ordena señales, pero no explica causas.

Flow Software propuso pasar de una jerarquía de datos a un **modelo de conocimiento** que describa activos, procesos, materiales y sus relaciones, con relaciones dependientes del tiempo y control de versiones. Thred Cloud planteó un **grafo de conocimiento operativo** con una recomendación que me pareció muy sensata: no modelar toda la empresa de una vez, sino empezar con una pregunta urgente y un contexto mínimo viable.

<figure>
  <img src="/images/posts/post-004-icc-2026-ignition-community-conference/01-grafo-conocimiento-datos-operativos.jpg" alt="Diapositiva del ICC 2026 con un grafo de conocimiento que conecta ERP, MES, PLM, SCM y otros sistemas sobre una plataforma de inteligencia" />
  <figcaption>Los datos operativos como base de la inteligencia: un grafo de conocimiento que relaciona ERP, MES, PLM, SCM y otros sistemas de la planta.</figcaption>
</figure>

Tres ideas que me llevo:

- Las relaciones entre entidades aportan el contexto necesario para investigar causas.
- El modelo debe conservar historia y cambios de configuración, para que una conclusión corresponda al momento que se analiza.
- Cada relación debería indicar de dónde proviene y cuándo era válida. Sin procedencia, un grafo puede producir asociaciones engañosas.

El valor de un modelo de contexto no se mide por su tamaño, sino por la rapidez y la calidad de la investigación que habilita.

---

## 2. Eventos, borde y trazabilidad: de la lectura al hecho confiable

### Arquitectura orientada a eventos

La sesión sobre arquitecturas orientadas a eventos en OT comparó patrones para extraer y distribuir información: MQTT nativo, Sparkplug B, puentes OPC, webhooks y APIs, captura de cambios en bases de datos y sondeo por diferencias.

La idea más importante fue esta: **un mensaje transportado no equivale a un evento confiable**. Hay que definir su significado, origen, tiempo y calidad. Y la arquitectura debe tolerar interrupciones, duplicados y consumidores con ritmos distintos.

Cada integración adicional da flexibilidad, pero también aumenta las pruebas, la gobernanza y la carga operativa. La elección del patrón depende de lo que el equipo pueda operar, no solo de lo que la tecnología permite.

### El borde para activos legados

Opto 22 mostró cómo conectar activos que todavía no entregan datos a los sistemas centrales usando dispositivos de borde y estándares como OPC UA y MQTT Sparkplug B. La lección práctica: el borde puede hacer visibles equipos antiguos sin reemplazar su sistema de control, siempre que se mantenga separada la captura de datos de las funciones críticas de control y se diseñe qué ocurre cuando la red falla.

### RFID y trazabilidad

La charla de trazabilidad con RFID en manufactura discreta hizo una distinción que conviene tener presente: **capturar una identificación física no es lo mismo que tener trazabilidad de negocio**. Un lector puede producir lecturas duplicadas, ausentes o ambiguas. La solución necesita interpretar eventos, mantener el estado de cada unidad y construir la genealogía entre materiales, componentes y producto.

Por eso retrabajos, asociaciones padre-hijo y excepciones deben diseñarse antes de instalar los puntos de captura. El hardware se valida contra el proceso y el entorno físico, pero no resuelve la genealogía por sí solo.

---

## 3. IA industrial: útil, pero con evidencia

Una diapositiva resumió bien el ambiente: toda empresa industrial operará dos fábricas, la física que produce y una "fábrica de IA" digital que genera la inteligencia que la gobierna.

<figure>
  <img src="/images/posts/post-004-icc-2026-ignition-community-conference/02-nvidia-fabrica-ia.jpg" alt="Diapositiva con una cita de Jensen Huang, fundador y CEO de NVIDIA, sobre las dos fábricas de toda empresa industrial" />
  <figcaption>Diapositiva presentada en el ICC 2026 con una cita de Jensen Huang, fundador y CEO de NVIDIA.</figcaption>
</figure>

La IA estuvo presente en buena parte de las sesiones, con un tono realista. Los mensajes más repetidos fueron:

- **La calidad del dato incluye su significado en el proceso**, no solo la limpieza de valores y nombres. Una de las charlas lo planteó como el paso del "dato basura" a la confianza en los resultados.
- **Los agentes necesitan herramientas con límites.** D3-AI mostró asistentes para diagnóstico del Gateway, trabajo en Designer y consultas, conectados mediante protocolos como MCP. También insistió en que diagnóstico, generación de código y operación requieren permisos distintos y no deben tratarse como una sola capacidad.
- **Validar una estructura no valida la verdad.** El uso de esquemas tipificados (por ejemplo con Pydantic) permite rechazar salidas mal formadas, pero no confirma que los datos o la explicación sean correctos. Hace falta contrastar con la fuente.
- **Los cálculos críticos deben ser reproducibles.** Se propuso que los agentes usen consultas o código ejecutable en lugar de razonamientos numéricos expresados solo en texto.
- **El experto sigue siendo responsable.** En el caso de Seeq aplicado a centros de datos, el asistente ayudó a correlacionar alarmas y a buscar el desencadenante, con trazabilidad a señales, intervalos y consultas, pero la interpretación quedó en manos del especialista.

<figure>
  <img src="/images/posts/post-004-icc-2026-ignition-community-conference/03-catalyst-agent-module.jpg" alt="Presentador en el escenario del ICC 2026 frente a la diapositiva del Catalyst Agent Module" />
  <figcaption>El Catalyst Agent Module, presentado en el escenario del ICC 2026.</figcaption>
</figure>

La sesión de capacitación (Onboarding Blueprint) agregó un matiz que comparto: la IA acelera el trabajo, pero el equipo necesita fundamentos para detectar respuestas o implementaciones incorrectas. Quien no entiende Ignition, Python o SQL difícilmente revisará bien lo que una IA genera.

---

## 4. De análisis a acción: cerrar el ciclo

Un análisis sin acción es un reporte. Dos sesiones ilustraron el cierre del ciclo desde ángulos distintos.

**La Fábrica Inteligente** planteó que el indicador útil no es el volumen de datos acumulados, sino el tiempo y la calidad de la decisión que viene después del dato. Reducir la latencia entre detectar un problema, entender su impacto, decidir y ejecutar requiere una fuente de verdad y límites claros de autonomía. La autonomía de un agente se define por permisos, consecuencias de la acción y mecanismos de supervisión.

**LLumin** mostró la integración bidireccional entre Ignition y un CMMS para llevar la condición y el uso de activos al flujo de mantenimiento: avisos, órdenes y seguimiento desde interfaces del operador. Mi conclusión es doble:

- La señal de condición produce valor cuando termina en una orden atendida y un resultado confirmado.
- Operación y mantenimiento deben ver el mismo estado del aviso para evitar alertas sin dueño.

Además, la charla distinguió con claridad la gestión basada en condición que existe hoy de la IA predictiva planteada como evolución. Conviene mantener esa distinción: una integración existente no demuestra una predicción futura.

---

## 5. Escala y adopción: donde los proyectos realmente se ganan o se pierden

### Empezar desde el problema

La guía para evitar errores millonarios en proyectos de automatización repitió lo que en la práctica se subestima: requisitos vagos, selección temprana de tecnología, alcance cambiante y poca participación de quienes van a operar la solución. La recomendación fue un trabajo previo de definición de ingeniería (FEED), con objetivos de negocio claros y una evaluación económica que incluya adopción, soporte, actualizaciones e integración, no solo la inversión inicial.

Es el mismo principio que desarrollé en el artículo sobre cómo estructurar un proyecto de transformación digital industrial: problema, métrica de éxito y límites del sistema antes de especificar componentes.

### Digitalización cerca del operador

El caso de JELD-WEN es un buen recordatorio de que digitalizar no siempre empieza con una arquitectura sofisticada. Pasaron de auditorías en papel, pizarras y conocimiento disperso a una gestión visual con Ignition: captura automática de paros desde PLC (incluidas paradas breves), tableros hora a hora y vistas para mantenimiento. La charla destacó la participación de los usuarios de planta en el diseño de pantallas útiles para su trabajo diario.

### Repetir entre plantas

Factory Stack presentó un enfoque modular para desplegar soluciones de forma repetible: configuración versionada, incorporación de sitios mediante archivos estructurados, recursos estandarizados y observabilidad. Dos ideas son aplicables a cualquier programa multiplanta:

- Monitorear la salud del Gateway, la red y los recursos es parte del despliegue, no una tarea posterior.
- Una plantilla común necesita puntos de adaptación explícitos para las diferencias reales entre plantas.

### Personas y comunidad

La keynote y el Onboarding Blueprint apuntaron al mismo lugar: la continuidad de una solución depende de una comunidad capaz de formar talento, de equipos que puedan construir, revisar, operar y corregir sin depender de una sola persona, y de soporte y seguridad después de la puesta en marcha.

<figure>
  <img src="/images/posts/post-004-icc-2026-ignition-community-conference/04-onboarding-timeline.jpg" alt="Diapositiva Onboarding Timeline con dos niveles de formación en Ignition que combinan autoestudio e instrucción dirigida" />
  <figcaption>El Onboarding Timeline de la charla de capacitación: dos niveles que combinan autoestudio (91 h en total) e instrucción dirigida (144 h).</figcaption>
</figure>

### Prototipar rápido y validar después

El Buildathon mostró con qué velocidad una idea puede convertirse en una interfaz funcional. Pero un prototipo es una prueba de concepto, no evidencia de desempeño en producción. La validación posterior debe probar estabilidad, seguridad, precisión y utilidad en operación real.

---

## El ecosistema de proveedores: capas distintas, no competidores directos

En el espacio de proveedores revisé las propuestas de 13 empresas del ecosistema Ignition. Lo más útil que saqué de ahí es una forma de ordenarlas por la necesidad que resuelven, porque no todas compiten entre sí.

| Necesidad | Proveedores relacionados | Distinción útil |
|---|---|---|
| Adquirir señales y conectar equipos | Moxa, Banner Engineering, SiteSync | Conectividad y redes; sensores e indicación; monitoreo inalámbrico LoRaWAN |
| Compartir datos entre equipos y aplicaciones | EMQ, Solace | Infraestructura MQTT/IIoT frente a distribución y gobierno de eventos. Existe solapamiento |
| Almacenar series temporales | TDengine, Timebase Historian | Comparar ingesta, consultas, retención, operación y costo |
| Contextualizar datos y estandarizar indicadores | Flow Software, TDengine IDMP, SepaIQ | Cómo representan activos, relaciones y cálculos |
| Ejecutar procesos MES | Sepasoft | Requiere definir rutas, estados, materiales y reglas |
| Coordinar respuesta a incidentes | IGear SQUEAKS | Avisos, responsables, escalamiento y resolución |
| Administrar mantenimiento | LLumin | Activos, órdenes, planificación y repuestos |
| Gestionar calidad y acciones correctivas | SafetyChain, SPC/MES de Sepasoft | Ajuste al proceso de manufactura discreta |
| Mejorar el entorno Ignition | Plantformance | Diagnóstico, gráficos, auditoría y acceso a recursos locales |
| Conseguir capacidad de ingeniería | Cognify | Servicio de talento; no resuelve arquitectura ni gobernanza |

Que dos soluciones aparezcan en un mismo proyecto no significa que deban contratarse juntas. Primero se define el problema y quién es responsable de cada función.

### Cómo leer la información comercial

Un evento como este expone mucho mensaje comercial. Estas son las reglas que apliqué:

- **Distinguir oferta, evidencia y aplicación propuesta.** Lo que anuncia un flyer no es lo mismo que un caso publicado, y ninguno es una validación independiente.
- **No trasladar resultados de un cliente a otra planta.** Un caso de OEE no demuestra funciones de genealogía; un testimonio de una planta no es el caso de otra.
- **Tratar las comparaciones de escala o ahorro como preguntas para validar**, no como resultados garantizados.
- **Confirmar compatibilidad por producto y versión** antes de instalar o contratar. Que un producto mencione versiones recientes de Ignition no acredita compatibilidad con la versión que tú operas.
- **Revisar las ofertas gratuitas con cuidado.** Una licencia de software sin costo no implica un piloto completo sin costo: infraestructura, servicios y soporte suelen ser aparte.

### Preguntas comunes para evaluar cualquier solución

1. ¿Qué versiones de Ignition, sistemas operativos y bases de datos están soportadas, y con qué restricciones?
2. ¿Qué parte es producto estándar y qué requiere configuración, programación o un integrador?
3. ¿Cómo se licencia: gateway, servidor, dispositivo, tag, usuario, sitio, volumen o suscripción?
4. ¿Qué sucede cuando se corta la red o se reinicia un componente? ¿Cómo se recuperan datos sin duplicarlos ni asociarlos incorrectamente?
5. ¿Qué datos permanecen accesibles y exportables si se decide retirar la solución?
6. ¿Qué soporte existe en mi país y con qué tiempos de atención?
7. ¿Puede demostrarse el caso con mis datos y reglas reales, con criterios de aceptación acordados?

---

## Lo que me llevo del ICC 2026

Si tuviera que resumir las lecciones en cinco puntos:

1. **El contexto vale más que el volumen.** Identidad, relaciones y tiempo convierten una señal en información útil.
2. **Un evento confiable se diseña.** Significado, origen, calidad, recuperación y duplicados no vienen incluidos con el transporte.
3. **La IA se gana la confianza con evidencia.** Trazabilidad a fuentes, cálculos reproducibles, permisos acotados y un experto que valida.
4. **El valor aparece al final del ciclo.** Una orden atendida, una respuesta a tiempo, una decisión mejor; no un tablero más.
5. **La adopción es parte de la arquitectura.** Operadores involucrados, equipo capacitado y despliegues repetibles con puntos de adaptación explícitos.

Y una regla práctica para cualquier iniciativa que salga de aquí:

> Antes de elegir una herramienta, define la decisión que quieres mejorar, el dato que la sustenta y quién será responsable de actuar. La tecnología viene después.

El ecosistema es amplio y avanza rápido. Precisamente por eso, la ventaja competitiva no está en conocer todas las herramientas, sino en saber formular el problema correcto y exigir una demostración con criterios claros.

---

<figure>
  <img src="/images/posts/post-004-icc-2026-ignition-community-conference/05-pablo-icc-2026.jpg" alt="El autor en el photocall de la Ignition Community Conference 2026" />
  <figcaption>En el ICC 2026.</figcaption>
</figure>
