---
id: post-004-it-ot-convergencia
title: "Convergencia IT/OT: el puente hacia la eficiencia"
date: "27-Oct-2025"
author: "Pablo Lucero"
category: "Ciberseguridad OT"
youtubeId: "L23oIHZE14w"
image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1600&q=80"
excerpt: "Proyecto de integración segura entre el ERP corporativo (IT) y el sistema de control de piso (OT) en una industria metalmecánica."
---

# Contexto

En una fábrica metalmecánica, las órdenes de producción se entregaban físicamente en papel, lo que generaba errores de transcripción y falta de visibilidad en el avance de los pedidos. La barrera entre IT (donde nacen las órdenes) y OT (donde se ejecutan) limitaba la agilidad del negocio.

## Solución

Desarrollé una capa de integración segura que sincroniza automáticamente las órdenes del ERP con los terminales táctiles de los operarios en planta. Al finalizar una tarea, el sistema OT notifica instantáneamente al ERP para actualizar el stock y disparar la siguiente fase logística. El puente se construyó garantizando que ninguna falla en la red de IT comprometiera la seguridad operativa de las prensas.

## Arquitectura

- **Middleware**: Desarrollado en Node.js para el mapeo dinámico de datos entre sistemas.
- **Seguridad**: Firewall perimetral industrial con inspección profunda de paquetes (DPI) para protocolos IT.
- **Interfaces**: Webapps responsivas diseñadas para entornos industriales de alto ruido visual.
- **Resultado**: Eliminación total del uso de papel en planta y reducción del 100% en errores de ingreso de datos.
