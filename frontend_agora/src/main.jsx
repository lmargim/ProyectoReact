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


let router = createBrowserRouter([
  // El elemento <Home/> se renderiza en la raíz de la aplicación
  {
    path: "/",
    element: <Home />,
    errorElement : <PaginaError />,
    children: [
      // Los hijos se renderizan en el elemento <outlet/> del padre
      {
        path: "/",
        element: <HomeContent />,
      },
      {
        path: "/altapublicacion",
        element:<AltaPublicacion/>
      },
      {
        path: "/listadopublicaciones",
        element:<ListadoPublicaciones/>
      },
      {
        path: "/altacomentario",
        element:<AltaComentario/>
      },
      {
        path: "/listadocomentarios",
        element:<ListadoComentarios/>
      },
      {
        path: "/modificarcomentario/:idcomentario",
        element:<ModificarComentario/>
      },
      {
        path: "/modificarpublicacion/:idpublicacion",
        element:<ModificarPublicacion/>
      },
      {
        path: "/buscarpublicacionporid",
        element:<BuscarPublicacionPorId/>
      },
      {
        path: "/buscarcomentarioporid",
        element:<BuscarComentarioPorId/>
      },
      {
        path: "/buscarpublicacionportema",
        element: <BuscarPublicacionPorTema />,
      },
      {
        path: "/buscarcomentarioporautor",
        element: <BuscarComentarioPorAutor />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

