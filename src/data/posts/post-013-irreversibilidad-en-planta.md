---
id: it-revierte-un-despliegue-operaciones-no-revierte-un-lote
title: "IT puede revertir un despliegue; Operaciones no puede revertir un lote que se está produciendo"
date: "20-Oct-2026"
author: "Pablo Lucero"
category: "Transformación Digital Industrial"
image: "/images/posts/post-013-irreversibilidad-en-planta/00-portada.jpg"
excerpt: "IT está diseñada para el cambio y Operaciones para la estabilidad. No son personalidades opuestas: son respuestas racionales a restricciones distintas."
---

En IT, un despliegue que sale mal tiene remedio: se revierte la versión, se restaura una copia de seguridad. Doloroso, pero reversible. En una planta, el lote que se está produciendo no tiene botón de deshacer. Si la temperatura del horno se salió de rango, si la receta cargó mal o si una prensa estampó doscientas piezas fuera de tolerancia, ese material ya está transformado. Se reprocesa, se desecha o, en el peor caso, llega al cliente.

Esa diferencia explica gran parte de la fricción entre IT y Operaciones.

## Dos mundos, dos lógicas

Dicho en corto: IT está diseñada para el cambio y optimiza la agilidad, la mejora iterativa y el despliegue rápido. Parchea mensualmente, hace pruebas A/B, gestiona infraestructura como código y celebra un 99,9 % de disponibilidad. Operaciones está construida para la estabilidad y mide el tiempo de actividad en dinero perdido por minuto. Hay plantas donde una parada no planificada cuesta millones, y servicios como el agua donde el "tiempo de inactividad aceptable" simplemente no existe.

<figure class="diagrama">
  <img src="/images/posts/post-013-irreversibilidad-en-planta/01-cambio-reversible-vs-irreversible.svg" alt="Diagrama: en IT un despliegue fallido se revierte y se itera; en Operaciones un cambio fallido deja material ya transformado" />
  <figcaption>En IT un cambio fallido se revierte. En Operaciones, el material ya está transformado.</figcaption>
</figure>

## No es un tema de cultura

Es tentador leer esto como un choque de culturas: IT "innovadora" contra Operaciones "resistente". Pero no se trata de diferencias de personalidad, sino de respuestas racionales a restricciones distintas.

Un ingeniero de planta que se niega a actualizar el software del controlador a mitad de una campaña no es un dinosaurio. Sabe que, si algo falla, no lo pagará un usuario molesto, sino un lote completo, una línea parada o, en ciertos procesos, la seguridad de alguien. Por eso los cambios se planifican para las paradas, se validan antes y se ejecutan con cuidado.

Y el profesional de IT que insiste en parchear tampoco es imprudente. Sabe que un sistema sin actualizar es una puerta abierta, y que un ataque puede detener la planta tanto como un mal cambio.

Esta tensión, y las palancas para convertirla en colaboración, las desarrollé en [Convergencia IT/OT: por qué la transformación digital se decide entre dos culturas](/blog/convergencia-it-ot-transformacion-digital-dos-culturas).

## Lo que sí se puede hacer

Reconocer la irreversibilidad no significa renunciar a la agilidad en planta. Significa trasladar la experimentación a donde sí es reversible:

- **Separar lo que toca el proceso de lo que solo lo observa.** Un tablero, un historiador o un modelo analítico pueden iterar rápido, la lógica de control, no.
- **Ensayar fuera del lote:** simuladores, entornos de prueba, líneas piloto, cambios de modelo programados.
- **Alinear los cambios con las ventanas de mantenimiento**, en lugar de pelear contra ellas.
- **Diseñar la reversión antes del cambio:** respaldo de la receta, del programa del PLC y criterio claro de vuelta atrás.

La próxima vez que un cambio "simple" de IT encuentre resistencia en planta, pregunta qué pasa con el lote si sale mal. La respuesta suele explicar toda la conversación.


---

**Siguiente lectura:** [Procesos, manufactura e infraestructura crítica](/blog/industria-de-procesos-manufactura-infraestructura-critica), el siguiente artículo de la serie IT/OT.
