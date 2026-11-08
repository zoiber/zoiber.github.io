---
id: cia-vs-siac-prioridades-it-operaciones
title: "CIA vs. SIAC: por qué IT y Operaciones ordenan sus prioridades al revés"
date: "26-Oct-2026"
author: "Pablo Lucero"
category: "Transformación Digital Industrial"
image: "/images/posts/post-015-cia-vs-siac/00-portada.jpg"
excerpt: "IT protege la información con la tríada CIA, Operaciones protege a las personas y la producción con SIAC. Mismas palabras, órdenes y significados distintos."
---

Antes de entrar en materia, una aclaración sobre las siglas, porque ambas vienen del inglés y se usan así en la industria:

- **CIA** = *Confidentiality, Integrity, Availability* → **Confidencialidad, Integridad y Disponibilidad**. Es la tríada clásica de la seguridad de la información.
- **SIAC** = *Safety, Integrity, Availability, Confidentiality* → **Seguridad de las personas, Integridad, Disponibilidad y Confidencialidad**. Es una forma de resumir la jerarquía de prioridades de OT u Operaciones.

Ojo con un detalle de traducción: en inglés, *safety* (proteger a las personas y el ambiente) y *security* (proteger sistemas contra amenazas) son palabras distintas. En español ambas se dicen "seguridad", y esa ambigüedad provoca más de un malentendido en las reuniones IT/OT. La *S* de SIAC es *safety*: la seguridad de las personas.

## El orden cuenta la historia

<figure class="diagrama">
  <img src="/images/posts/post-015-cia-vs-siac/01-cia-vs-siac.svg" alt="Diagrama: la tríada CIA de IT frente a la jerarquía SIAC de Operaciones; la confidencialidad pasa del primer al último puesto" />
  <figcaption>CIA y SIAC: la confidencialidad pasa del primer puesto en IT al último en Operaciones.</figcaption>
</figure>

**IT ordena por CIA.** Primero protege los datos del acceso no autorizado, después evita modificaciones indebidas y, en tercer lugar, garantiza que los sistemas estén disponibles. Es una jerarquía forjada en décadas de defender sistemas empresariales contra filtraciones, fraudes e incumplimientos regulatorios.

**OT ordena por SIAC.** Primero, las personas y el ambiente, sin excepciones. Después, la integridad física de los equipos. Luego, que la producción siga. Y al final, la confidencialidad, que en planta suele significar proteger la receta o el proceso como propiedad intelectual. Esta jerarquía nació de accidentes reales, lesiones reales y la certeza de que en manufactura una mala decisión tiene consecuencias físicas.

## Mismas palabras, otros significados

Lo más traicionero no es el orden, sino que dos palabras se repiten con sentidos distintos:

| Término | En IT (CIA) | En OT (SIAC) |
|---|---|---|
| Integridad | Que un dato no se altere sin autorización | Que el equipo y el sistema de control no fallen ni sean manipulados |
| Disponibilidad | Que el sistema responda cuando lo necesitan | Que la línea produzca el máximo tiempo posible |
| Confidencialidad | Prioridad número uno | Última prioridad, aunque importa (la receta) |
| Seguridad de las personas | No existe en la tríada | Prioridad absoluta |

Cuando alguien de IT dice "esto compromete la integridad", piensa en una base de datos. Cuando alguien de planta escucha "integridad", piensa en una prensa o un enclavamiento. Ambos asienten y cada uno se va con una idea distinta de lo acordado.

## Un ejemplo concreto: el parche nocturno

Para IT, desplegar parches automáticos por la noche en toda la empresa es una buena práctica: cierra vulnerabilidades (C e I) sin molestar a nadie. Para Operaciones, ese mismo reinicio en un equipo que controla la línea a mitad de turno puede dañar el equipo, crear un riesgo para las personas o, como mínimo, parar la producción (S, I y A). La misma acción es responsable para un modelo e imprudente para el otro.

## Ambos tienen razón

En resumen: el problema no es que un lado esté equivocado, sino que optimizan objetivos genuinamente distintos, hablan idiomas distintos y nadie se molestó en contratar un traductor. El primer paso para colaborar no es elegir un modelo ganador, sino reconocer que ambos son racionales en su contexto.

En tu próxima reunión con IT, cuando aparezcan "integridad", "disponibilidad" o "seguridad", pide que se diga explícitamente si hablan de datos, de equipos o de personas. Te ahorrará semanas de malentendidos.


---

**Siguiente lectura:** ["Primero, no explotar": cómo evalúa OT una tecnología nueva](/blog/primero-no-explotar-como-evalua-ot-una-tecnologia-nueva), el siguiente artículo de la serie IT/OT.
