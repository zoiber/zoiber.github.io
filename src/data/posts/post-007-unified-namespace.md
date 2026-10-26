---
id: que-es-unified-namespace-uns-cuando-implementarlo
title: "Qué es un Unified Namespace (UNS) y cuándo tiene sentido implementarlo"
date: "26-Oct-2026"
author: "Pablo Lucero"
category: "Arquitectura Industrial"
image: "/images/posts/post-007-unified-namespace/00-portada.jpg"
excerpt: "Qué es realmente un Unified Namespace (UNS), qué no es, cómo se relaciona con MQTT, ISA-95 y Purdue, y cuándo tiene sentido implementarlo en una planta."
---

Si has estado cerca de una conversación de arquitectura industrial en los últimos años, seguramente escuchaste el término **Unified Namespace** o **UNS**. Aparece en conferencias, en hojas de producto de casi todos los proveedores y en propuestas de integradores. Y, como pasa con todo concepto de moda, se usa para describir cosas muy distintas: desde "tenemos un broker MQTT" hasta "rediseñamos cómo fluye la información de toda la empresa".

En este artículo quiero ordenar el concepto: qué es un UNS, de qué capas se compone, qué problema resuelve de verdad, dónde están sus límites y cómo se relaciona con modelos que ya conoces, como Purdue e ISA-95. No es un artículo de producto; es un artículo de arquitectura.

---

## Qué es un Unified Namespace

Un **Unified Namespace** es un **patrón de arquitectura** en el que todos los sistemas de una planta (máquinas, PLCs, SCADA, MES, ERP, historiadores, aplicaciones de calidad o de IA) publican su información en **un único espacio central, organizado jerárquicamente y en tiempo real**, y cualquier sistema autorizado puede suscribirse a la información que necesita.

El término fue popularizado por Walker Reynolds y la comunidad de 4.0 Solutions, y hoy aparece en casi cualquier conversación sobre arquitectura de datos industriales.

Tres ideas lo definen:

1. **Un solo lugar para el estado actual de la operación.** Qué está produciendo cada línea, en qué estado está cada máquina, qué orden se está ejecutando, cuál fue el último resultado de prueba. No hay que preguntar a cinco sistemas distintos.
2. **Una estructura que le da significado al dato.** La información no se publica como una lista plana de tags, sino dentro de una jerarquía que refleja la empresa: sitio, área, línea, celda, equipo. Un valor de temperatura deja de ser `DB12.REAL4` y pasa a ser la temperatura del molde en la estación de espumado de la línea 3.
3. **Desacoplamiento entre quien produce y quien consume.** El PLC publica una vez. El SCADA, el MES, el tablero de mantenimiento y el modelo de IA consumen ese mismo dato sin conectarse directamente al PLC y sin saber unos de otros.

---

## Lo que un UNS no es

Buena parte de la confusión alrededor del UNS se resuelve aclarando lo que **no** es:

| Se suele creer que… | En realidad… |
|---|---|
| Es un producto que se compra | Es un patrón de diseño. Hay productos que ayudan a implementarlo, pero ninguno "es" el UNS |
| Es lo mismo que MQTT | MQTT es el protocolo más usado para implementarlo, pero no el único. Un UNS también puede construirse con otras tecnologías |
| Reemplaza al historiador | El UNS representa el estado actual. La historia se guarda en un historiador o en una base de datos que se suscribe al UNS |
| Ordena los datos automáticamente | Solo publica lo que se le entrega. Si la nomenclatura es caótica, el UNS será un caos centralizado |
| Elimina la necesidad de Purdue y la segmentación de redes | Complementa a Purdue; no lo reemplaza |

El UNS es una implementación de los fundamentos de una buena plataforma de datos (conectividad, modelado de contexto, estándares y gobernanza), **no un sustituto de ellos**. Una implementación de UNS no resuelve por sí sola la gobernanza ni garantiza que el contexto sea correcto y completo.

---

## Cómo funciona: las cuatro piezas

### 1. Un broker de mensajes

En el centro hay un **broker**, normalmente MQTT. Los productores publican mensajes en *topics* y los consumidores se suscriben a los topics que les interesan. El broker se encarga de distribuir cada mensaje a quien corresponda.

MQTT encaja bien en planta porque es liviano, funciona sobre redes poco confiables y publica **por excepción**: solo cuando un valor cambia, no cada segundo "por si acaso".

### 2. Una jerarquía (el *namespace* propiamente dicho)

La jerarquía de topics es lo que convierte un broker en un namespace. La referencia más usada es **ISA-95**, que organiza la empresa en niveles: empresa, sitio, área, línea, celda y equipo.

Un ejemplo simplificado:

```text
empresa/planta-1/ensamble/linea-03/espumado/estado
empresa/planta-1/ensamble/linea-03/espumado/temperatura-molde
empresa/planta-1/ensamble/linea-03/orden-actual
empresa/planta-1/calidad/linea-03/prueba-hermeticidad/ultimo-resultado
```

Quien lee esa ruta entiende de inmediato qué es el dato y de dónde viene, sin abrir el programa del PLC.

### 3. Un formato de mensaje con contexto

Cada mensaje necesita algo más que un número: unidad, marca de tiempo, calidad del dato y, cuando aplica, a qué orden, producto o lote pertenece.

Aquí aparecen dos enfoques habituales:

- **[Sparkplug B](https://sparkplug.eclipse.org/)**, una especificación de la Eclipse Foundation (versión 3.0 desde 2023) que estandariza la estructura de topics y mensajes para datos OT, e incorpora algo muy valioso en planta: los mensajes de nacimiento y muerte (*birth* y *death*). Gracias a ellos, cualquier consumidor sabe si un equipo está conectado o si el último valor que ve ya no es confiable.
- **JSON con un esquema definido**, más legible y común para información de negocio (órdenes, resultados de calidad, eventos de producción).

Muchas arquitecturas combinan ambos.

### 4. Conectores en el borde (*edge*)

La mayoría de los equipos de una planta no hablan MQTT. Hablan Modbus, EtherNet/IP, S7, OPC UA o protocolos propietarios. Por eso, entre la máquina y el broker suele haber un **gateway o plataforma de borde** que lee el dato en su protocolo nativo, le agrega contexto y lo publica en el lugar correcto del namespace.

Ese mismo componente permite conectar equipos antiguos sin modificar su programa de control, algo que en planta suele ser la diferencia entre un proyecto viable y uno imposible.

---

## Por qué importa: integrar como suma, no como producto

En una arquitectura punto a punto, cada nuevo consumidor necesita una conexión con cada fuente. Con tres fuentes y cuatro consumidores ya hay doce integraciones a medida. Cada una con su lógica, su responsable y su forma de fallar.

Con un broker en el centro, cada fuente se conecta una vez y cada consumidor se conecta una vez: siete conexiones. Y lo más importante: **un consumidor nuevo no obliga a tocar las fuentes**.

Ariens y van Lammeren, de IT/OT Hanbook, lo expresan así: con un intermediario, las integraciones crecen como una suma, no como un producto.

Para un gerente, esto se traduce en algo concreto: el costo y el tiempo del décimo caso de uso deberían ser mucho menores que los del primero. Si cada proyecto nuevo cuesta lo mismo que el anterior, la planta no está construyendo una plataforma; está acumulando integraciones.

---

## Un ejemplo de planta

En una planta de manufactura de electrodomésticos, el proyecto de trazabilidad empezó por algo más básico que cualquier tablero: darle una **identidad única** a cada gabinete, cada puerta y cada tarjeta electrónica.

Una vez que cada componente tiene número de serie, los eventos de la línea dejan de ser datos sueltos y pasan a ser parte de la historia de un producto: qué componentes lo forman, por qué estaciones pasó, qué pruebas realizó y con qué resultado.

En una arquitectura con UNS, ese evento ("el producto con serie X pasó la prueba de hermeticidad con este resultado") se publica una sola vez. Lo consume el sistema de trazabilidad para construir la genealogía, el tablero de calidad para calcular el FPY, mantenimiento para correlacionar fallas con el estado del equipo y, más adelante, un modelo de IA para buscar patrones en los defectos.

Es el mismo dato, publicado una vez, con su contexto, y aprovechado por cuatro áreas.

---

## UNS y el modelo Purdue

Una duda frecuente es si el UNS hace obsoleto al [modelo Purdue](/blog/modelo-purdue-explicado-para-ingenieros). La respuesta corta es no.

Purdue sigue siendo útil para **separar zonas, proteger el control y definir responsabilidades**. El UNS resuelve otro problema: **cómo se mueve y se comparte la información**.

En la práctica, la mayoría de las organizaciones usan ambos: Purdue para el núcleo de control, donde la estabilidad y la seguridad son lo primero, y una arquitectura de publicación-suscripción para la capa de distribución de datos, donde importan la flexibilidad y la escala. El broker suele ubicarse en el nivel 3 o en la DMZ industrial (nivel 3.5), con reglas claras sobre qué cruza hacia el nivel 4 y hacia la nube.

Eso sí: un broker al que todos pueden publicar y del que todos pueden leer cambia el modelo de seguridad. Se pasa de proteger un perímetro a controlar **identidades, permisos por topic y cifrado en tránsito**. Eso debe diseñarse desde el inicio, no agregarse al final.

---

## Cuándo tiene sentido implementar un UNS

Un UNS suele tener sentido cuando se cumplen varias de estas condiciones:

- **Hay muchos consumidores para los mismos datos.** Producción, calidad, mantenimiento, energía, analítica e IA piden información de las mismas máquinas.
- **Las integraciones punto a punto ya son un problema.** Cada cambio en un PLC o en el SCADA rompe algo en otro sistema, y nadie tiene el mapa completo.
- **Se planea escalar.** Más líneas, más plantas o más casos de uso con la misma arquitectura.
- **Se necesita información orientada a eventos.** Paros, cambios de orden, resultados de pruebas o alarmas que deben llegar en segundos, no en el reporte del día siguiente.
- **Existe voluntad de gobernar el dato.** Alguien será responsable de la estructura del namespace y de quién puede publicar y leer qué.

Y probablemente **no** sea la prioridad cuando:

- La planta tiene pocas máquinas y un solo consumidor de datos. Una integración directa bien documentada puede ser suficiente.
- Todavía no hay datos confiables desde los equipos. Primero hay que conectar y estabilizar la captura.
- No existe una nomenclatura mínima de activos y líneas. Sin ella, el UNS solo centraliza el desorden.
- Se busca porque "es lo que se usa ahora", sin un caso de uso que lo justifique.

---

## Prerrequisitos que suelen subestimarse

**1. Una nomenclatura acordada.** El namespace es, en el fondo, un estándar de nombres. Definir cómo se llaman las áreas, las líneas, los equipos, los estados y los eventos es trabajo de ingeniería y de consenso, no de software. Es la parte más aburrida del proyecto y la que más determina su éxito.

**2. Un dueño del namespace.** Si cualquiera puede crear topics a su manera, en seis meses habrá tres formas distintas de publicar el estado de una máquina.

**3. Una decisión sobre la historia.** El UNS muestra el presente. Hay que definir qué datos se historizan, dónde y con qué resolución.

**4. Alta disponibilidad y operación local.** Si el broker se cae, ¿qué deja de funcionar? Los sistemas críticos de planta deben seguir operando aunque falle la red corporativa o Internet.

**5. Seguridad desde el diseño.** Autenticación de clientes, permisos por rama del namespace, cifrado y segmentación de redes.

---

## Errores comunes

- **Publicar todos los tags "por si acaso".** Miles de variables sin contexto ni consumidor convierten el broker en un basurero de datos. Es mejor empezar por lo que un caso de uso necesita.
- **Copiar la estructura del PLC.** El namespace debe reflejar cómo se entiende la operación (línea, estación, producto), no cómo está organizada la memoria del controlador.
- **Confundir el UNS con el proyecto.** El UNS es infraestructura. El valor aparece cuando un caso de uso concreto (OEE, trazabilidad, mantenimiento, calidad) lo aprovecha.
- **Ignorar el estado de conexión.** Un valor que no cambia puede significar que el proceso está estable o que el equipo está desconectado. Sin mecanismos como los de Sparkplug B, no hay forma de saberlo.
- **Dejar la gobernanza para después.** Cuando el namespace ya tiene cientos de consumidores, cambiar la estructura es muy costoso.

---

## Cómo empezar sin sobredimensionar

Un camino razonable para una planta que quiere explorar el UNS:

1. **Elegir un caso de uso con valor claro**, por ejemplo el estado y los paros de una línea para calcular OEE.
2. **Definir la jerarquía ISA-95 de esa línea** y las convenciones de nombres, pensando en que luego se replicará.
3. **Conectar las máquinas a través del borde**, publicando solo las variables y los eventos que el caso de uso necesita, con su contexto.
4. **Conectar dos o más consumidores al mismo dato** (un tablero y un historiador, por ejemplo) para demostrar el desacoplamiento.
5. **Documentar y gobernar**: quién es dueño del namespace, cómo se agregan nuevas ramas y quién puede publicar o leer.
6. **Replicar en la siguiente línea** y medir si la segunda integración costó menos que la primera. Ese es el verdadero indicador de que la arquitectura funciona.

---

## Para cerrar

El Unified Namespace no es una tecnología nueva ni un producto mágico. Es una forma ordenada de aplicar ideas que ya existían (publicación-suscripción, jerarquías ISA-95, eventos y contexto) para que los datos de una planta se publiquen una vez y se aprovechen muchas veces.

Su mayor beneficio no es técnico. Es económico y organizacional: reduce el costo de cada nuevo caso de uso y obliga a IT y OT a ponerse de acuerdo en algo que suele postergarse durante años, cómo se llaman y qué significan los datos de la operación.

**Un UNS no ordena los datos de una planta. Hace visible si alguien ya se tomó el trabajo de ordenarlos.**

---

**Siguiente lectura:** [Hablemos sobre OT](/blog/hablemos-sobre-ot-tecnologias-de-la-operacion): qué son las Tecnologías de la Operación y por qué la transformación digital industrial empieza en el PLC y no en la nube.
