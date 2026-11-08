# Imágenes de los posts

Una carpeta por post, con el mismo nombre que su archivo en `src/data/posts/`.

| Carpeta | Post |
|---|---|
| `post-001-transformacion-digital/` | post-001-transformacion_digital_industrial_blog.md |
| `post-002-proyecto-transformacion-digital/` | post-002-proyecto-transformacion-digital.md |
| `post-003-modelo-purdue/` | post-003-modelo-purdue.md |
| `post-004-icc-2026-ignition-community-conference/` | post-004-icc-2026-ignition-community-conference.md |
| `post-005-mas-alla-de-los-pilotos-modelo-operativo-ia/` | post-005-mas-alla-de-los-pilotos-modelo-operativo-ia.md |
| `post-006-hablemos-sobre-ot/` | post-006-hablemos-sobre-ot.md |
| `post-007-unified-namespace/` | post-007-unified-namespace.md |
| `post-008-isa-95-explicado-con-una-fabrica/` | post-008-isa-95-explicado-con-una-fabrica.md |
| `post-009-convergencia-it-ot/` | post-009-convergencia-it-ot.md |
| `post-010-cuatro-presiones-digitalizacion/` | post-010-cuatro-presiones-digitalizacion.md |
| `post-011-tres-dominios-de-valor/` | post-011-tres-dominios-de-valor.md |
| `post-012-trazabilidad-automatizada/` | post-012-trazabilidad-automatizada.md |
| `post-013-irreversibilidad-en-planta/` | post-013-irreversibilidad-en-planta.md |
| `post-014-procesos-manufactura-infraestructura/` | post-014-procesos-manufactura-infraestructura.md |
| `post-015-cia-vs-siac/` | post-015-cia-vs-siac.md |
| `post-016-primero-no-explotar/` | post-016-primero-no-explotar.md |
| `post-017-roles-en-una-planta/` | post-017-roles-en-una-planta.md |
| `post-018-que-es-ot-perfiles/` | post-018-que-es-ot-perfiles.md |
| `post-019-it-no-es-google/` | post-019-it-no-es-google.md |

## Convenciones
- Nombres en minúsculas, sin espacios ni tildes: `01-portada.jpg`, `02-diagrama-purdue.png`.
- `00-portada.jpg` (o `.webp`): imagen del frontmatter (`image:`). Recomendado 1400 px de ancho.
- Formatos: `.jpg`/`.webp` para fotos, `.png`/`.svg` para diagramas. Idealmente < 300 KB por imagen.
- Carpeta nueva para cada post: `post-00X-<slug>/`.

## Cómo usarlas
Vite sirve `public/` desde la raíz del sitio.

En el frontmatter:

```yaml
image: "/images/posts/post-004-icc-2026-ignition-community-conference/00-portada.jpg"
```

En el cuerpo Markdown:

```markdown
![Descripción de la imagen](/images/posts/post-004-icc-2026-ignition-community-conference/01-ejemplo.png)
```
