import { Outlet } from "react-router"; // Importa el componente Outlet para renderizar rutas anidadas
import Menu from "../components/Menu"; // Importa el componente Menu
import Footer from "../components/Footer"; // Importa el componente Footer

/**
 * Componente `Home`.
 * 
 * Este componente representa la estructura básica de la página principal de la aplicación.
 * Incluye el menú de navegación, el contenido dinámico (rutas anidadas) y el pie de página.
 * 
 * @returns {JSX.Element} - Retorna un elemento JSX que representa la estructura de la página principal.
 */
function Home() {
  return (
    <>
      {/* Menú de navegación */}
      <Menu />

      {/* Contenido dinámico (rutas anidadas) */}
      <Outlet />

      {/* Pie de página */}
      <Footer />
    </>
  );
}

export default Home;