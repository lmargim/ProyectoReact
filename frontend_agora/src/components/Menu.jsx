import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
} from "mdb-react-ui-kit";
import logo from "../assets/agora_icon.png"; // Importa el logo de la aplicación
import { Link } from "react-router"; // Importa el componente Link para la navegación
import { useState } from "react"; // Importa el hook useState para manejar el estado
import { appTitle } from "../config"; // Importa el título de la aplicación desde la configuración

/**
 * Componente `Menu`.
 * 
 * Este componente representa la barra de navegación de la aplicación.
 * Incluye enlaces a las diferentes secciones de la aplicación, como publicaciones y comentarios.
 * También permite la navegación entre páginas y la expansión del menú en dispositivos móviles.
 * 
 * @returns {JSX.Element} - Retorna un elemento JSX que representa la barra de navegación.
 */
function Menu() {
  const [openBasic, setOpenBasic] = useState(false); // Estado para controlar la visibilidad del menú en dispositivos móviles

  return (
    <>
      {/* Barra de navegación */}
      <MDBNavbar expand="lg" light bgColor="light" className="sticky-top">
        <MDBContainer fluid>
          {/* Logo y título de la aplicación */}
          <Link to="/">
            <MDBNavbarBrand>
              <img src={logo} alt="agora_icon" height="40" loading="lazy" />
              {appTitle}
            </MDBNavbarBrand>
          </Link>

          {/* Botón para expandir/colapsar el menú en dispositivos móviles */}
          <MDBNavbarToggler
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setOpenBasic(!openBasic)} // Cambia el estado al hacer clic
          >
            <MDBIcon icon="bars" fas /> {/* Ícono de barras para el menú */}
          </MDBNavbarToggler>

          {/* Contenido colapsable del menú */}
          <MDBCollapse navbar open={openBasic}>
            <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">
              {/* Menú desplegable para Publicaciones */}
              <MDBNavbarItem>
                <MDBDropdown>
                  <MDBDropdownToggle tag="a" className="nav-link" role="button">
                    Publicaciones
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                    {/* Enlace para añadir una publicación */}
                    <Link to="/altapublicacion" style={{ color: "#4f4f4f" }}>
                      <MDBDropdownItem link>Añadir publicación</MDBDropdownItem>
                    </Link>
                    {/* Enlace para listar publicaciones */}
                    <Link
                      to="/listadopublicaciones"
                      style={{ color: "#4f4f4f" }}
                    >
                      <MDBDropdownItem link>
                        Listar publicaciones
                      </MDBDropdownItem>
                    </Link>
                    {/* Enlace para buscar una publicación por ID */}
                    <Link
                      to="/buscarpublicacionporid"
                      style={{ color: "#4f4f4f" }}
                    >
                      <MDBDropdownItem link>Buscar por id</MDBDropdownItem>
                    </Link>
                    {/* Enlace para buscar una publicación por tema */}
                    <Link
                      to="/buscarpublicacionportema"
                      style={{ color: "#4f4f4f" }}
                    >
                      <MDBDropdownItem link>Buscar por tema</MDBDropdownItem>
                    </Link>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavbarItem>

              {/* Menú desplegable para Comentarios */}
              <MDBNavbarItem>
                <MDBDropdown>
                  <MDBDropdownToggle tag="a" className="nav-link" role="button">
                    Comentarios
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                    {/* Enlace para añadir un comentario */}
                    <Link to="/altacomentario" style={{ color: "#4f4f4f" }}>
                      <MDBDropdownItem link>Añadir comentario</MDBDropdownItem>
                    </Link>
                    {/* Enlace para listar comentarios */}
                    <Link to="/listadocomentarios" style={{ color: "#4f4f4f" }}>
                      <MDBDropdownItem link>Listar comentarios</MDBDropdownItem>
                    </Link>
                    {/* Enlace para buscar un comentario por ID */}
                    <Link
                      to="/buscarcomentarioporid"
                      style={{ color: "#4f4f4f" }}
                    >
                      <MDBDropdownItem link>Buscar por id</MDBDropdownItem>
                    </Link>
                    {/* Enlace para buscar un comentario por autor */}
                    <Link
                      to="/buscarcomentarioporautor"
                      style={{ color: "#4f4f4f" }}
                    >
                      <MDBDropdownItem link>Buscar por autor</MDBDropdownItem>
                    </Link>
                    {/* Enlace para ver la gráfica de comentarios */}
                    <Link to="/graficacomentarios" style={{ color: "#4f4f4f" }}>
                      <MDBDropdownItem link>Gráfica de comentarios</MDBDropdownItem>
                    </Link>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavbarItem>

              {/* Opción de modo oscuro (comentada por ahora) */}
              {/* <MDBNavbarItem className="ml-auto">
                <MDBSwitch
                  label="Modo oscuro"
                  // checked={isChecked}
                  // onChange={handleSwitchChange}
                />
              </MDBNavbarItem> */}
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </>
  );
}

export default Menu;