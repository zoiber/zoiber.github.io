# Guía de Despliegue Local - Portafolio Pablo Lucero

Esta guía detalla los pasos necesarios para configurar y ejecutar el proyecto de portafolio en tu entorno local.

## Requisitos Previos

Asegúrate de tener instalados los siguientes componentes en tu sistema:

- **Node.js**: Se recomienda la versión indicada en el archivo `.nvmrc` (puedes usar `nvm use` si tienes NVM instalado).
- **npm**: Habitualmente incluido con la instalación de Node.js.

## Pasos para el Despliegue

### 1. Clonar el Repositorio

Si aún no tienes el código, clona el repositorio desde GitHub:

```bash
git clone <url-del-repositorio>
cd pablo-lucero-portafolio
```

### 2. Instalar Dependencias

Ejecuta el siguiente comando en la raíz del proyecto para instalar todas las librerías necesarias:

```bash
npm install
```

### 3. Ejecutar en Modo Desarrollo

Para iniciar el servidor de desarrollo local con recarga en tiempo real, usa:

```bash
npm run dev
```

Una vez ejecutado, el proyecto estará disponible en `http://localhost:3000` (o el puerto que se indique en la terminal).

### 4. Generar Versión de Producción (Opcional)

Si deseas generar los archivos estáticos optimizados para producción:

```bash
npm run build
```

Los archivos resultantes se guardarán en la carpeta `dist/`.

## Notas Adicionales

- **Configuración de Supabase**: El cliente de Supabase ya viene preconfigurado en `src/lib/customSupabaseClient.js`, por lo que no es necesario configurar variables de entorno adicionales para las funcionalidades básicas.
- **Vite**: El proyecto utiliza Vite como herramienta de construcción, lo que garantiza una experiencia de desarrollo rápida.
