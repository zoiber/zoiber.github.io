---
id: hablemos-sobre-ot-tecnologias-de-la-operacion
title: "Hablemos sobre OT"
date: "24-Oct-2026"
author: "Pablo Lucero"
category: "Transformación Digital Industrial"
image: "/images/posts/post-006-hablemos-sobre-ot/00-portada.jpg"
excerpt: "Qué son las Tecnologías de la Operación (OT), en qué se diferencian de IT y por qué la transformación digital industrial empieza en el PLC y no en la nube."
---

En una planta, si el ERP se cae una hora, se atrasan facturas.

Si se cae el PLC de una línea de ensamble, se para la producción.

Esa es la forma más simple que conozco de explicar qué es OT. Y también la razón por la que tantos proyectos de transformación digital tropiezan: se diseñan con la lógica del primer caso y se ejecutan en el mundo del segundo.

En este artículo quiero explicarte qué es OT, qué la hace distinta de IT y por qué entender esa diferencia es el primer paso para que cualquier iniciativa industrial (datos, IA, trazabilidad, ciberseguridad) funcione de verdad.

---

## Qué es OT

**OT (Operational Technology, o Tecnologías de la Operación)** es el hardware y el software que monitorea y controla procesos físicos.

Si caminas por una planta, la estás viendo:

- **PLCs** que ejecutan la lógica de una máquina o una línea.
- **Variadores de frecuencia** que controlan la velocidad de motores, bandas y ventiladores.
- **Sensores y actuadores** que miden temperatura, presión, posición o presencia, y que abren válvulas o mueven cilindros.
- **Robots** que sueldan, pintan, manipulan o paletizan.
- **HMIs** donde el operador ve el estado de la máquina e interactúa con ella.
- **SCADA**, que supervisa y coordina varias máquinas o un área completa.
- **Historiadores**, que guardan el comportamiento del proceso en el tiempo.

IT gestiona información *sobre* el negocio: pedidos, facturas, inventarios, nómina, correo. OT no gestiona información sobre el negocio. **OT mueve el negocio.** Es donde la materia prima se convierte en producto.

Una forma útil de verlo:

| | IT | OT |
|---|---|---|
| Qué controla | Información y transacciones | Procesos físicos |
| Consecuencia de una falla | Pérdida o retraso de datos | Paro de producción, daño a equipos, riesgo para personas |
| Prioridad principal | Confidencialidad | Disponibilidad y seguridad de las personas |
| Tiempo que importa | Rendimiento promedio | Respuesta predecible (determinismo) |
| Ciclo de vida típico | 3 a 5 años | 15 a 20 años o más |
| Ventana de cambios | Planificada por IT | Negociada con producción |

Ninguna columna es "mejor" que la otra. Son dos mundos diseñados para resolver problemas distintos. El problema aparece cuando uno intenta operar en el otro con sus propias reglas.

---

## Las 4 cosas que más le cuesta entender a quien llega desde IT

Después de varios años en automatización y ahora en arquitectura de transformación digital industrial, he visto repetirse las mismas fricciones. Casi nunca son técnicas en el sentido estricto. Son diferencias de criterio.

### 1. Las prioridades están invertidas

En seguridad de la información se suele hablar de la tríada **CIA**: confidencialidad, integridad y disponibilidad, más o menos en ese orden de importancia. En IT tiene sentido: filtrar datos de clientes es de lo peor que puede pasar.

En OT el orden se invierte. Primero está la **seguridad de las personas**, luego la **disponibilidad** del proceso, después la integridad del control y, al final, la confidencialidad. Que alguien lea el valor de temperatura de un horno es un problema menor. Que alguien (o algo) detenga ese horno a mitad de un ciclo, o lo haga operar fuera de rango, es un problema mayor.

Esto cambia decisiones muy concretas:

- **Parches y actualizaciones.** Un parche que reinicia un equipo no se aplica "cualquier día de la semana". Se prueba, se valida con el fabricante del equipo, se agenda en una parada planificada y se negocia con producción.
- **Antivirus y agentes.** Una herramienta que en una laptop es inofensiva puede consumir recursos en una estación de operación, bloquear accesos o afectar su tiempo de respuesta.
- **Escaneos de red.** Un escaneo agresivo que en la red corporativa es rutina puede saturar un PLC antiguo y dejarlo fuera de servicio.

**Para el gerente:** cuando producción "se resiste" a un cambio de IT, muchas veces no es resistencia al cambio. Es gestión del riesgo operativo.

**Para el ingeniero de IT:** antes de proponer el control, pregunta qué pasa si ese control falla o se comporta mal. En OT, la pregunta no es solo "¿esto protege?", sino "¿esto puede parar la línea?".

### 2. El tiempo se mide distinto

En IT se habla de rendimiento: qué tan rápido responde una aplicación en promedio, cuántas transacciones procesa por segundo. Si una consulta tarda 200 ms en vez de 50 ms, el usuario apenas lo nota.

En OT lo que importa no es que sea solo rápido, sino que sea predecible. Una señal de un sensor de seguridad, una orden a un servomotor o la sincronización entre dos ejes tienen que llegar en milisegundos, y siempre en el mismo tiempo. A esto se le llama determinismo.

Piensa en una prensa o en un robot que trabaja coordinado con una banda. Si la señal llega a veces en 2 ms y a veces en 40 ms, el problema no es la velocidad promedio: es la variación (el *jitter*). Esa variación se traduce en demoras de secuencia, piezas defectuosas, golpes mecánicos o paros por seguridad.

Por eso en OT existen redes, protocolos y arquitecturas diseñadas para garantizar tiempos de ciclo, y por eso hay que tener cuidado al "aprovechar" esa misma red para otras cosas. Mezclar tráfico de control con video, respaldos o tráfico corporativo, sin diseño, es una forma silenciosa de introducir problemas difíciles de diagnosticar.

### 3. Los ciclos de vida son largos

Un servidor o una laptop se renuevan cada 4 o 5 años. Un PLC puede pasar 15 o 20 años en una línea. Y no es descuido: si la máquina produce bien, cumple con calidad y el repuesto está disponible, reemplazar el control implica detener producción, reprogramar, volver a validar y asumir riesgo. Muchas veces el costo de cambiar es más alto que el beneficio inmediato.

El resultado es que en una misma planta conviven varias generaciones de tecnología al mismo tiempo:

- PLC modernos con Ethernet industrial junto a equipos que solo hablan por puertos serie.
- Protocolos abiertos y estándar junto a protocolos propietarios de un solo fabricante.
- Estaciones de operación con sistemas operativos que ya no reciben soporte, porque el software del fabricante solo corre ahí.

Esto tiene implicaciones directas en cualquier proyecto:

- **Integrar datos** no es "conectarse a la API". Muchas veces implica gateways, conversores de protocolo y un trabajo cuidadoso equipo por equipo.
- **La ciberseguridad** no puede depender solo de parchear. Hay que proteger por arquitectura: segmentar, controlar accesos y monitorear.
- **Las decisiones de hoy** van a acompañar a la planta durante una década o más. Elegir protocolos abiertos y arquitecturas desacopladas no es un detalle técnico, es una decisión de negocio.

### 4. El dato nace en el piso

Todo lo que hoy se conoce como IA industrial, mantenimiento predictivo, gemelos digitales o trazabilidad tiene algo en común: depende de datos que se originan en OT.

La temperatura de un horno, la corriente de un motor, el torque de un atornillado, el resultado de una prueba eléctrica, el número de serie de una pieza. Todo eso nace en un sensor, un PLC o un banco de pruebas, mucho antes de llegar a un dashboard o a un modelo.

Y aquí está el punto que más se subestima: si esa capa no está bien diseñada, no hay modelo que lo compense. Algunos ejemplos de lo que suele fallar:

- **Contexto.** Un valor de `87.3` no sirve de nada si no sabes de qué máquina viene, en qué unidad está, qué producto se estaba fabricando y en qué estado estaba el equipo (produciendo, en setup, detenida).
- **Calidad del dato.** Sensores descalibrados, señales congeladas, valores por defecto que parecen reales. Un dato malo con buena presentación es más peligroso que un dato ausente.
- **Marcas de tiempo.** Si los equipos no están sincronizados, no puedes correlacionar eventos. Y sin correlación no hay análisis de causa raíz ni genealogía de producto confiable.
- **Frecuencia y granularidad.** Un promedio cada 15 minutos puede ser suficiente para un reporte de energía y completamente inútil para detectar una falla en un rodamiento.

Por eso, cuando alguien me pregunta por dónde empezar con IA en planta, mi respuesta casi siempre es la misma: empieza por revisar cómo nace, se nombra y se transporta el dato. Lo demás se construye sobre eso.

---

## La convergencia IT/OT no es una fusión

Durante años se ha hablado de la "convergencia IT/OT" como si el objetivo fuera que uno absorba al otro: que IT tome el control de la planta o que OT haga todo por su cuenta.

Yo no lo veo así. La veo como un puente bien diseñado entre dos mundos que tienen razones válidas para funcionar distinto. Ese puente tiene, al menos, cuatro pilares:

**1. Redes segmentadas.**
La red de control no debería ser una extensión plana de la red corporativa. Separar por zonas, controlar qué cruza entre ellas y por dónde (por ejemplo, a través de una zona intermedia o DMZ industrial) reduce el impacto de un incidente y protege el determinismo del que hablamos antes. Marcos como el [modelo Purdue](/blog/modelo-purdue-explicado-para-ingenieros) y la norma IEC 62443 existen precisamente para ordenar esta conversación.

**2. Modelos de datos comunes.**
Si cada sistema nombra las cosas a su manera, la integración se convierte en un proyecto eterno de traducciones. Definir cómo se llama un activo, una línea, un estado o un evento, y usar referencias como ISA-95 para estructurar esa jerarquía, es lo que permite que el dato de OT tenga significado para IT.

**3. Arquitecturas como el UNS.**
El **Unified Namespace (UNS)** propone un punto central, organizado y en tiempo real donde cada sistema publica su información con contexto y del que otros sistemas pueden consumirla, sin integraciones punto a punto. No es una solución mágica ni aplica a todos los casos, pero es una forma muy potente de desacoplar el piso de planta de las aplicaciones de negocio. Lo explico en detalle en [Qué es un Unified Namespace (UNS) y cuándo tiene sentido implementarlo](/blog/que-es-unified-namespace-uns-cuando-implementarlo).

**4. Equipos que hablan ambos idiomas.**
Este es el pilar más difícil y el más importante. La tecnología se compra; el criterio se construye. Necesitamos ingenieros de automatización que entiendan redes, datos y ciberseguridad, y profesionales de IT que entiendan qué significa un paro de línea. Y necesitamos líderes que pongan a ambos en la misma mesa desde el inicio del proyecto, no cuando algo ya falló.

---

## Qué puedes hacer a partir de mañana

**Si eres gerente o líder de área:**

- Antes de aprobar un proyecto de datos o IA, pregunta de dónde sale el dato, quién es responsable de su calidad y qué pasa si el sistema falla.
- Incluye a producción, automatización e IT desde la definición del proyecto, no solo en la implementación.
- Mide el riesgo de un cambio en términos operativos (horas de paro, scrap, seguridad), no solo en términos de costo de licencias o equipos.
- Trata la arquitectura OT como un activo de largo plazo: las decisiones de hoy van a vivir 15 años.

**Si eres ingeniero (de IT o de OT):**

- Haz un inventario básico: qué equipos hay, qué protocolos hablan, qué versión tienen y quién los mantiene.
- Revisa la sincronización de tiempo de tus equipos y sistemas. Es barato y desbloquea mucho.
- Documenta el contexto de las variables críticas: nombre, unidad, rango, origen, frecuencia.
- Si vienes de IT, pasa un turno en planta. Si vienes de OT, siéntate con el equipo de redes o de datos. Pocas cosas aceleran tanto el entendimiento mutuo.

---

## Para cerrar

OT no es "la parte vieja" de la empresa ni un obstáculo para la innovación. Es el lugar donde se crea el valor físico, y por lo tanto el lugar donde nacen los datos que hoy todos quieren aprovechar.

Entender sus prioridades, su relación con el tiempo, sus ciclos de vida y su rol como origen del dato no es un tema exclusivo de los ingenieros de automatización. Es una condición necesaria para que cualquier estrategia digital industrial tenga éxito.

**La transformación digital industrial no empieza en la nube. Empieza en el PLC.**

---

**Siguiente lectura:** [Modelo Purdue explicado para ingenieros](/blog/modelo-purdue-explicado-para-ingenieros) — cómo se organizan los niveles de una arquitectura industrial y dónde encaja la frontera entre IT y OT.
