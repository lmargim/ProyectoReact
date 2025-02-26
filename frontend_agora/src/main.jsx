import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

import { createBrowserRouter, RouterProvider } from "react-router";

import Home from './pages/Home';
import HomeContent from './components/HomeContent';
import AltaPublicacion from './components/AltaPublicacion';
import ListadoPublicaciones from './components/ListadoPublicaciones';
import AltaComentario from './components/AltaComentario';
import ListadoComentarios from './components/ListadoComentarios';
import ModificarComentario from "./components/ModificarComentario";
import ModificarPublicacion from "./components/ModificarPublicacion";
import PaginaError from "./pages/PaginaError";
import BuscarPublicacionPorId from './components/BuscarPublicacionPorId';
import BuscarComentarioPorId from './components/BuscarComentarioPorId';
import BuscarPublicacionPorTema from './components/BuscarPublicacionPorTema';
import BuscarComentarioPorAutor from './components/BuscarComentarioPorAutor';
import GraficoComentarios from './components/GraficoComentarios';

/**
 * Configuración de rutas para la aplicación utilizando React Router.
 * Define las rutas principales y sus componentes asociados.
 */
let router = createBrowserRouter([
  {
    path: "/",
    element: <Home />, // Componente principal
    errorElement: <PaginaError />, // Página de error en caso de rutas no encontradas
    children: [
      {
        path: "/",
        element: <HomeContent />, // Contenido principal de la página de inicio
      },
      {
        path: "/altapublicacion",
        element:<AltaPublicacion/> // Formulario para agregar una nueva publicación
      },
      {
        path: "/listadopublicaciones",
        element:<ListadoPublicaciones/> // Lista de publicaciones existentes
      },
      {
        path: "/altacomentario",
        element:<AltaComentario/> // Formulario para agregar un nuevo comentario
      },
      {
        path: "/listadocomentarios",
        element:<ListadoComentarios/> // Lista de comentarios existentes
      },
      {
        path: "/modificarcomentario/:idcomentario",
        element:<ModificarComentario/> // Edición de un comentario por su ID
      },
      {
        path: "/modificarpublicacion/:idpublicacion",
        element:<ModificarPublicacion/> // Edición de una publicación por su ID
      },
      {
        path: "/buscarpublicacionporid",
        element:<BuscarPublicacionPorId/> // Búsqueda de publicación por ID
      },
      {
        path: "/buscarcomentarioporid",
        element:<BuscarComentarioPorId/> // Búsqueda de comentario por ID
      },
      {
        path: "/buscarpublicacionportema",
        element: <BuscarPublicacionPorTema />, // Búsqueda de publicaciones por tema
      },
      {
        path: "/buscarcomentarioporautor",
        element: <BuscarComentarioPorAutor />, // Búsqueda de comentarios por autor
      },
      {
        path: "/graficacomentarios",
        element: <GraficoComentarios />, // Visualización de estadísticas de comentarios
      },
    ],
  },
]);

/**
 * Renderiza la aplicación React en el elemento con ID "root".
 * Envuelve la aplicación en StrictMode para detectar problemas potenciales.
 */
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
