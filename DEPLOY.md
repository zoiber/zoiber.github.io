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
git remote add origin https://github.com/<TU-USUARIO>/pablo-lucero-github.git
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
`https://<TU-USUARIO>.github.io/pablo-lucero-github/`

> [!NOTE]
> Reemplaza `<TU-USUARIO>` con tu nombre de usuario de GitHub (ej. `pablo-lucero`).

---

## Notas Técnicas

- **Enrutamiento SPA**: Se usan `public/404.html` e `index.html` con scripts de redirección para que las rutas de React funcionen al refrescar.
- **Base Path**: Vite está configurado con `base: '/pablo-lucero-github/'`.
- **Supabase**: Preconfigurado en `src/lib/customSupabaseClient.js`.
