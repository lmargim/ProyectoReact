# Ágora - Proyecto React

## Descripción

Ágora es una aplicación web desarrollada en React que implementa una relación **1:N** entre publicaciones y comentarios. Cada publicación puede tener múltiples comentarios, pero cada comentario solo pertenece a una única publicación.

## Tecnologías utilizadas

### Frontend

- **React**: Biblioteca principal para la construcción de la interfaz de usuario.
- **MUI (Material-UI)**: Para la interfaz de usuario, proporcionando componentes modernos y estilizados.
- **MDBootstrap**: Para componentes y estilos adicionales.
- **React Router**: Para la navegación y manejo de rutas dentro de la aplicación.
- **RECHART**: Para la generación de gráficas.
- **jsPDF (https://github.com/parallax/jsPDF)**: Para generar documentos PDF a partir de la interfaz de usuario.
- **html2canvas (https://html2canvas.hertzen.com/)**: Captura de elementos HTML para su conversión a imágenes.
- **react-pdf (https://react-pdf.org/)**: Generación de PDFs directamente desde React.

### Backend

- **Node.js**: Para ejecutar código JavaScript fuera del navegador, ideal para nuestra API.
- **Express**: Para definir los endpoints que el frontend de React puede consumir mediante solicitudes HTTP.
- **Sequelize**: Para gestionar la base de datos y realizar consultas mediante JavaScript.
- **Nodemon**: Para reiniciar automáticamente el servidor cada vez que realizamos cambios en los archivos del código fuente (modo desarrollo).
- **CORS**: Para habilitar CORS en el servidor Express, permitiendo que tu servidor acepte peticiones desde diferentes orígenes.
- **DOTENV**: Para cargar variables de entorno desde un archivo `.env` en el entorno de desarrollo.

## Autor

**Luis Martín**

## Instalación

Para ejecutar el proyecto localmente, sigue estos pasos:

1. Clona el repositorio:

   git clone https://github.com/lmargim/agora.git
   
2. Accede a las carpetas de frontend y backend y luego instala las dependencias:

   cd frontend
   npm install
   cd ../backend
   npm install
   
3. Ejecuta el backend y el frontend en dos terminales diferentes usando el siguiente comando en cada carpeta:

     Para el backend:
      npm run dev
      
     Para el frontend:
      npm run dev

## Enlaces

1. [GitHub](https://github.com/lmargim/ProyectoReact)
2. [Despliegue](https://agora-production-f57b.up.railway.app)
