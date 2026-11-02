---
id: isa-95-explicado-con-una-fabrica-de-ejemplo
title: "ISA-95 explicado utilizando una fábrica como ejemplo"
date: "31-Oct-2026"
author: "Pablo Lucero"
category: "Arquitectura Industrial"
image: "/images/posts/post-008-isa-95-explicado-con-una-fabrica/00-portada.jpg"
excerpt: "Qué es ISA-95, cómo se leen sus niveles y modelos, y cómo aplicarlo a una fábrica real de refrigeradores: desde la orden del ERP hasta el número de serie en la línea."
---

Si alguna vez estuviste en una reunión donde desde el ERP decían que se habían fabricado 1.200 productos, el SCADA decía 1.180 y el supervisor de línea decía "más o menos 1.150, porque hubo reprocesos", ya conoces el problema que ISA-95 intenta resolver.

No es un problema de tecnología. Es un problema de idioma: cada sistema y cada área describen la misma fábrica con palabras distintas, a ritmos distintos y con responsabilidades difusas en la frontera. ISA-95 es, ante todo, un acuerdo sobre ese idioma.

En este artículo vamos a recorrer ISA-95, usando una fábrica de refrigeradores ficticia (pero muy parecida a cualquier planta real) como hilo conductor.

## Qué es ISA-95 (y qué no es)

ISA-95 es un estándar de la International Society of Automation, adoptado internacionalmente como IEC 62264, que define cómo se integran los sistemas de gestión del negocio (ERP) con los sistemas de manufactura (MES, SCADA, control). Está dividido en varias partes; las que más vas a usar en la práctica son:

- **Parte 1:** modelos y terminología. Los niveles, la jerarquía de equipos y la información que cruza la frontera entre negocio y planta.
- **Partes 2 y 4:** los objetos y atributos con los que se describe esa información (personal, equipos, materiales, segmentos de proceso, órdenes).
- **Parte 3:** el modelo de actividades de la gestión de operaciones de manufactura. Es decir, *qué se hace* en el nivel 3, independientemente del software que lo haga.
- **Parte 5:** las transacciones entre negocio y manufactura.

Igual de importante es lo que no es:

- **No es un producto.** Ningún proveedor "vende ISA-95"; como mucho, su producto usa sus modelos.
- **No es una arquitectura de red.** Eso lo cubren el modelo Purdue y la IEC 62443 (volveremos a esto).
- **No te obliga a comprar un MES.** Te obliga a reconocer que las actividades del nivel 3 existen y que alguien (un sistema, una hoja de cálculo o una persona) las está haciendo.

## La fábrica de ejemplo

Imagina Andino, una empresa que fabrica refrigeradores domésticos en una planta con estas áreas:

- **Metalmecánica:** prensas y perfiladoras que forman gabinetes y puertas.
- **Termoformado y plásticos:** contrapuertas termoformadas a partir de lámina, y bandejas y piezas técnicas inyectadas.
- **Espumado:** inyección de poliuretano entre el gabinete metálico y la cuba interna, que da rigidez y aislamiento.
- **Ensamble final:** montaje del sistema de refrigeración, compresor, cableado y accesorios.
- **Pruebas:** carga de refrigerante, prueba de hermeticidad y prueba de funcionamiento.
- **Almacén:** materia prima, componentes y producto terminado.

Con esta fábrica en mente, ISA-95 deja de ser un diagrama de libro y se vuelve algo que puedes caminar.

## Los niveles funcionales: quién decide qué y a qué ritmo

ISA-95 organiza las funciones de una empresa industrial en cinco niveles. La clave no es memorizarlos, sino entender que cada nivel trabaja en una escala de tiempo distinta.

| Nivel | Qué hace | Escala de tiempo | En Andino |
|---|---|---|---|
| **4** | Planificación del negocio y logística | Meses, semanas, días | El ERP decide fabricar 1.200 unidades del modelo REF-1450 esta semana y compra los compresores. |
| **3** | Gestión de operaciones de manufactura | Días, turnos, horas, minutos | Se secuencian las órdenes por línea, se libera el material, se registra qué número de serie llevó qué compresor. |
| **2** | Supervisión y control | Minutos, segundos | El SCADA muestra el estado de la espumadora y gestiona las alarmas de la línea de ensamble. |
| **1** | Sensado y actuación | Segundos, milisegundos | El PLC de la espumadora controla temperatura de componentes, presión y tiempo de inyección. |
| **0** | El proceso físico | Tiempo real | El poliuretano reaccionando dentro del gabinete. |

<figure>
  <img src="/images/posts/post-008-isa-95-explicado-con-una-fabrica/01-isa95-niveles-fabrica.svg" alt="Niveles funcionales de ISA-95 aplicados a una fábrica de refrigeradores: del nivel 4 (ERP) al nivel 0 (proceso físico), con los cuatro flujos de información entre el nivel 4 y el nivel 3" />
  <figcaption>Los cinco niveles funcionales de ISA-95 en la fábrica de ejemplo, con su escala de tiempo y los cuatro flujos que cruzan la frontera entre el ERP y la planta.</figcaption>
</figure>

La frontera más importante (y la que ISA-95 trata con más detalle) es la que separa el **nivel 4 del nivel 3**. Arriba se habla de pedidos, costos, semanas y unidades vendibles. Abajo se habla de turnos, estaciones, lotes y números de serie. Casi todos los conflictos de datos de una fábrica nacen en esa frontera.

### Qué cruza la frontera entre el ERP y la planta

ISA-95 identifica cuatro grandes flujos de información entre el nivel 4 y el nivel 3. En nuestra fábrica se ven así:

1. **Definición de producto** (de 4 a 3): qué es un REF-1450, con qué lista de materiales y con qué ruta de fabricación.
2. **Capacidad de producción** (de 3 a 4): cuántas unidades pueden salir realmente esta semana, considerando que una prensa estará en mantenimiento el jueves.
3. **Programa de producción** (de 4 a 3): fabricar 1.200 unidades del REF-1450 y 800 del REF-1300 entre lunes y viernes.
4. **Desempeño de producción** (de 3 a 4): se fabricaron 1.168 unidades conformes, se consumieron 1.190 compresores y hubo 22 reprocesos en prueba de hermeticidad.

Vuelve a la reunión del inicio. Los tres números distintos aparecen porque nadie definió con precisión el cuarto flujo: qué cuenta como "fabricado", en qué punto del proceso y con qué estado de calidad. ISA-95 no te da la respuesta, pero te obliga a hacerte la pregunta en el lugar correcto.

## La jerarquía de equipos: cómo se llaman las cosas

El segundo modelo que más vas a usar es la jerarquía de equipos. Define cómo nombrar y anidar los activos físicos de la empresa según su rol:

```
Empresa / Sitio / Área / Centro de trabajo / Unidad de trabajo
```

En una manufactura discreta como la nuestra, los centros de trabajo suelen ser líneas de producción y las unidades de trabajo son celdas o estaciones. Aplicado a Andino:

```
Andino / PlantaNorte / Espumado / LineaEspumado1 / Espumadora01
Andino / PlantaNorte / EnsambleFinal / Linea2 / EstacionCargaRefrigerante
Andino / PlantaNorte / Pruebas / Linea2 / PruebaHermeticidad
```

Parece trivial, pero esta jerarquía es la columna vertebral de casi todo lo que viene después:

- Los nombres de tags en el SCADA y el historiador.
- La estructura de un Unified Namespace, que normalmente la toma tal cual (lo expliqué en [Qué es un Unified Namespace](/blog/que-es-unified-namespace-uns-cuando-implementarlo)).
- La forma de agregar indicadores: el OEE de la estación se suma al de la línea, el de la línea al del área.
- La trazabilidad: saber en qué estación exacta se ensambló cada número de serie.

Un consejo práctico: nombra por rol, no por ubicación física ni por proveedor. "Espumadora01" sobrevive a un cambio de máquina; "MaquinaNueva_Nave3" no.

## Las actividades del nivel 3: lo que realmente pasa en la planta

Aquí está, en mi opinión, la parte más valiosa y menos conocida de ISA-95. La Parte 3 describe el nivel 3 como cuatro categorías de operaciones:

- **Producción:** fabricar el producto.
- **Calidad:** asegurar que el producto cumple.
- **Mantenimiento:** asegurar que los equipos están disponibles.
- **Inventario:** asegurar que el material está donde y cuando se necesita.

Y para cada una repite el mismo ciclo de actividades: gestionar los recursos, gestionar las definiciones (recetas, instrucciones, planes), programar en detalle, despachar, gestionar la ejecución, recolectar datos, hacer seguimiento y analizar el desempeño.

Sigamos una orden de producción del REF-1450 a través de ese ciclo:

1. **Programación detallada:** el programa semanal del ERP se convierte en una secuencia por línea y turno. El REF-1450 va primero en la línea 2 porque comparte molde de puerta con la orden anterior.
2. **Despacho:** al inicio del turno se liberan las órdenes a la línea y se pide al almacén el kit de compresores.
3. **Gestión de la ejecución:** cada estación recibe instrucciones y parámetros. La espumadora carga la receta correspondiente al gabinete del REF-1450.
4. **Recolección de datos:** el PLC de la prueba de hermeticidad entrega el resultado de cada unidad; la estación de carga registra la masa de refrigerante.
5. **Seguimiento:** se asocia el número de serie del refrigerador con el lote del compresor, el resultado de la prueba y el operador. Esto es la base de la genealogía.
6. **Análisis del desempeño:** al cierre del turno, se calcula cuántas unidades conformes salieron, cuántas fueron a reproceso y por qué.

Mientras tanto, en paralelo, mantenimiento programa la limpieza del cabezal de la espumadora, calidad revisa la tendencia de fugas en la estación de soldadura de tubería, e inventario ajusta el stock de compresores consumidos.

Nada de esto requiere un MES para existir. Pero si no lo hace un sistema, lo hace una hoja de cálculo, un tablero de papel o la memoria de un supervisor. Y eso es exactamente lo que vale la pena saber.

## Un autodiagnóstico rápido

Esta es la forma en la que más uso ISA-95 en el día a día: como lista de verificación. Toma la siguiente tabla y, para cada celda, responde dónde vive hoy esa actividad en tu planta: un sistema, una hoja de cálculo, papel, o nadie.

| Actividad | Producción | Calidad | Mantenimiento | Inventario |
|---|---|---|---|---|
| Programación detallada | | | | |
| Despacho | | | | |
| Gestión de la ejecución | | | | |
| Recolección de datos | | | | |
| Seguimiento | | | | |
| Análisis del desempeño | | | | |

En la mayoría de plantas que conozco, el resultado tiene un patrón claro: la recolección de datos de producción, y el seguimiento y el análisis de calidad e inventario viven en Excel. Esas celdas vacías o en papel son tu verdadera hoja de ruta, mucho más útil que una lista de "módulos de MES" de un proveedor.

## ISA-95 frente al modelo Purdue

Es muy común confundirlos, porque ambos tienen niveles numerados del 0 al 4 y comparten origen histórico. Pero responden a preguntas distintas:

- El **modelo Purdue**, como vimos en [Modelo Purdue explicado para ingenieros](/blog/modelo-purdue-explicado-para-ingenieros), se usa hoy sobre todo para decidir dónde van las fronteras de red y de seguridad: qué zona habla con cuál y a través de qué conductos.
- **ISA-95** define qué información se intercambia, cómo se llama y quién es responsable de cada actividad.

Si lo quieres en una frase: Purdue es el cable; ISA-95 es lo que viaja por él. Un buen diseño necesita ambos, y el UNS se apoya en los dos: Purdue para saber por dónde puede fluir el dato, ISA-95 para saber cómo nombrarlo y qué significa.

## Errores comunes al aplicar ISA-95

- **Querer implementarlo completo.** El estándar es extenso. Úsalo como mapa y vocabulario, no como checklist de cumplimiento. Empieza por la jerarquía de equipos y la frontera nivel 4–nivel 3.
- **Confundir "nivel 3" con "MES".** El nivel 3 es un conjunto de actividades. Un MES es una forma (entre varias) de automatizarlas.
- **Nombrar por ubicación o por proveedor.** Ya lo mencionamos: los nombres por rol son los que sobreviven a los cambios de planta.
- **Dejar que el ERP baje hasta la estación.** Cuando el ERP intenta gestionar minutos y estaciones, o cuando el PLC intenta resolver planificación, aparecen las integraciones frágiles y los datos contradictorios.
- **Hacerlo solo desde automatización o solo desde IT.** El valor de ISA-95 está precisamente en sentar a producción, calidad, mantenimiento, logística e IT alrededor del mismo modelo.

## Qué puedes hacer esta semana

**Si eres gerente:** pide que te expliquen, con una sola definición, qué significa "unidad fabricada" en tu empresa y en qué punto del proceso se cuenta. Si recibes tres respuestas distintas, ya sabes por dónde empezar.

**Si eres ingeniero:** dibuja la jerarquía de equipos de tu planta, de la empresa hasta la estación, y si tienes SCADA compárala con su estructura de tags. Las diferencias que encuentres son deuda técnica que tarde o temprano vas a pagar en el historiador, en los tableros o en el UNS.

## Conclusión

ISA-95 no es un estándar para cumplir, sino un idioma común para describir una fábrica. Sus niveles explican quién decide qué y a qué ritmo; su jerarquía de equipos explica cómo se llaman las cosas; y su modelo de actividades explica qué tiene que pasar en la planta para que una orden del ERP se convierta en un refrigerador conforme, con su historia completa.

Cuando ese idioma existe, los tres números de la reunión se convierten en uno. Y a partir de ahí, la arquitectura (el SCADA, el MES, el UNS o la IA) tiene sobre qué construir.

---

**Sigue leyendo:** [Qué es un Unified Namespace (UNS)](/blog/que-es-unified-namespace-uns-cuando-implementarlo) · [Modelo Purdue explicado para ingenieros](/blog/modelo-purdue-explicado-para-ingenieros) · [Hablemos sobre OT](/blog/hablemos-sobre-ot-tecnologias-de-la-operacion)
