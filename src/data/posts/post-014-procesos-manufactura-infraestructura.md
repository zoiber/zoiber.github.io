---
id: industria-de-procesos-manufactura-infraestructura-critica
title: "Procesos, manufactura e infraestructura crítica"
date: "23-Oct-2026"
author: "Pablo Lucero"
category: "Transformación Digital Industrial"
image: "/images/posts/post-014-procesos-manufactura-infraestructura/00-portada.jpg"
excerpt: "Industria de procesos, manufactura e infraestructura crítica: qué las distingue y por qué ese contexto cambia cómo se diseña cualquier solución digital."
---

Decir "trabajo en la industria" es tan vago como decir "trabajo con computadoras". Para quien llega desde IT, la primera pregunta útil no es qué software usa la planta, sino cómo se transforma el material. El mundo industrial se puede agrupar en tres grandes categorías, y cada una impone reglas distintas a la digitalización.

## Industria de procesos: materiales que fluyen

Transforma materias primas (líquidos, gases o sólidos a granel) mediante reacciones químicas o físicas: petróleo que se convierte en combustible, gas natural refinado en químicos, ingredientes que se mezclan y calientan para hacer medicamentos o alimentos.

Funciona de dos maneras:

- **Producción continua:** el material fluye las 24 horas, como en una refinería que nunca se detiene.
- **Producción por lotes:** cantidades definidas pasan por pasos secuenciales, como en la química de especialidades.

Lo que la distingue es que se gestionan materiales que fluyen, no piezas que se ensamblan.

## Manufactura: productos que se arman

Diseño, fabricación, ensamble e inspección se combinan para crear un producto que cumple especificaciones técnicas. Incluye automotriz, electrónica, alimentos envasados, aeroespacial y línea blanca. Muchas veces consume lo que produce la industria de procesos: el acero, el esmalte y los plásticos llegan a la planta para convertirse en una cocina o un refrigerador.

## Infraestructura crítica: servicios que no pueden fallar

Agua potable, generación y distribución de energía, control de vías. Activos y redes tan vitales que, si dejan de funcionar, la sociedad se desestabiliza. Aquí la disponibilidad no es un indicador: es una obligación pública y regulada.

## Qué cambia para quien diseña soluciones

<figure class="diagrama">
  <img src="/images/posts/post-014-procesos-manufactura-infraestructura/01-tres-mundos-industriales.svg" alt="Diagrama: procesos, manufactura e infraestructura crítica, cada uno con su ancla de datos" />
  <figcaption>Cada mundo industrial tiene su propia ancla de datos.</figcaption>
</figure>

| | Procesos | Manufactura | Infraestructura crítica |
|---|---|---|---|
| Qué se gestiona | Flujo de material | Piezas y ensambles | Servicio continuo |
| Unidad de análisis | Activo, lote o campaña | Orden, modelo y número de serie | Activo y red geográfica |
| Dato típico | Temperatura, presión, caudal | Tiempos de ciclo, OEE, resultados de prueba | Niveles, presiones, consumo, telemetría |
| Costo de un error | Lote perdido o riesgo de seguridad | Retrabajo, desecho o reclamo de campo | Interrupción del servicio a la población |
| Ventana de cambio | Paradas programadas, a veces de años | Cambios de modelo y paradas cortas | Mínima, mucha redundancia |

Esto tiene consecuencias prácticas. Un modelo de datos pensado para lotes no sirve tal cual en una línea de ensamble donde lo importante es la unidad serializada. Un enfoque de despliegue que funciona en una planta discreta con paradas semanales puede ser inviable en una refinería que para cada cinco años.

Por tanto, antes de proponer una arquitectura, identifica en cuál de los tres mundos estás y cuál es tu "unidad de análisis". Esa sola decisión cambia el diseño del modelo de datos.


---

**Siguiente lectura:** [CIA vs. SIAC: por qué IT y Operaciones ordenan sus prioridades al revés](/blog/cia-vs-siac-prioridades-it-operaciones), el siguiente artículo de la serie IT/OT.
