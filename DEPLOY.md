# Guía de Despliegue - Portafolio Pablo Lucero

Esta guía detalla los pasos para configurar, ejecutar localmente y desplegar en GitHub Pages.

## 1. Despliegue Local

### Requisitos Previos
- **Node.js**: Versión indicada en `.nvmrc`.
- **npm**: Habitualmente incluido con Node.js.

### Pasos
1. **Instalar Dependencias**: `npm install`
2. **Ejecutar Desarrollo**: `npm run dev` (Disponible en `http://localhost:3000`)
3. **Build Manual**: `npm run build` (Resultados en `dist/`)

---

## 2. Despliegue en GitHub Pages

El proyecto usa **GitHub Actions** para despliegue automático.

### Paso 1: Configuración Inicial de Git (Si no se ha hecho)
Si tu repositorio local no está conectado a GitHub todavía:
```bash
git remote add origin https://github.com/zoiber/zoiber.github.io.git
git branch -M main
```

### Paso 2: Subir Cambios
```bash
git add .
git commit -m "feat: setup github pages deployment"
git push -u origin main
```

### Paso 3: Activar en GitHub
1. Ve a **Settings > Pages** en tu repositorio.
2. En **Build and deployment > Source**, selecciona **GitHub Actions**.

### Paso 4: Verificar URL
El sitio estará disponible en:
`https://zoiber.github.io/`

> [!NOTE]
> Reemplaza `zoiber` con tu nombre de usuario de GitHub si es necesario.

---

## 3. Configuración de Dominio Personalizado (Hostinger)

Para vincular un dominio comprado en Hostinger (ej. `tudominio.com`) con tu página de GitHub (`zoiber.github.io`), sigue estos pasos.

### Paso 1: Archivo CNAME local
1. En la carpeta `public/` de este proyecto, asegúrate de que exista un archivo llamado **exactamente** `CNAME` (sin extensiones).
2. El contenido de ese archivo debe ser únicamente tu dominio:
   ```text
   tudominio.com
   ```
3. Sube los cambios a GitHub.

### Paso 2: Configuración en GitHub
1. Ve a **Settings > Pages** en tu repositorio en GitHub.
2. En la sección **Custom domain**, escribe tu dominio (`tudominio.com`) y guarda.
3. *Asegúrate de marcar "Enforce HTTPS" una vez que el DNS se propague.*

### Paso 3: Configuración DNS en Hostinger
1. Ve a la zona DNS de tu dominio en Hostinger.
2. Elimina cualquier registro `A` o `CNAME` antiguo.
3. Crea **4 registros tipo A** apuntando a GitHub:
   - Nombre: `@` | Objetivo: `185.199.108.153`
   - Nombre: `@` | Objetivo: `185.199.109.153`
   - Nombre: `@` | Objetivo: `185.199.110.153`
   - Nombre: `@` | Objetivo: `185.199.111.153`
4. Crea **1 registro CNAME**:
   - Nombre: `www` | Objetivo: `zoiber.github.io`
   
**Nota:** La propagación de DNS puede tardar hasta 24 horas.

---

## Notas Técnicas

- **Enrutamiento SPA**: Se usan `public/404.html` e `index.html` con scripts de redirección para que las rutas de React funcionen al refrescar.
- **Base Path**: Vite está configurado con `base: '/'`.
- **Supabase**: Preconfigurado en `src/lib/customSupabaseClient.js`.
