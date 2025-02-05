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
import logo from "../assets/agora_icon.png";
import { Link } from "react-router";
import { useState } from "react";
import { appTitle } from "../config";

function Menu() {
  const [openBasic, setOpenBasic] = useState(false);

  return (
    <>
      <MDBNavbar expand="lg" light bgColor="light" className="sticky-top">
        <MDBContainer fluid>
          <Link to="/">
            <MDBNavbarBrand>
              <img src={logo} alt="agora_icon" height="40" loading="lazy" />
              {appTitle}
            </MDBNavbarBrand>
          </Link>

          <MDBNavbarToggler
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setOpenBasic(!openBasic)}
          >
            <MDBIcon icon="bars" fas />
          </MDBNavbarToggler>

          <MDBCollapse navbar open={openBasic}>
            <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">
              {/* PUBLICACIONES */}
              <MDBNavbarItem>
                <MDBDropdown>
                  <MDBDropdownToggle tag="a" className="nav-link" role="button">
                    Publicaciones
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <Link to="/altapublicacion" style={{ color: "#4f4f4f" }}>
                      <MDBDropdownItem link>Añadir publicación</MDBDropdownItem>
                    </Link>
                    <Link
                      to="/listadopublicaciones"
                      style={{ color: "#4f4f4f" }}
                    >
                      <MDBDropdownItem link>
                        Listar publicaciones
                      </MDBDropdownItem>
                    </Link>
                    <Link
                      to="/buscarpublicacionporid"
                      style={{ color: "#4f4f4f" }}
                    >
                      <MDBDropdownItem link>Buscar por id</MDBDropdownItem>
                    </Link>
                    <Link
                      to="/buscarpublicacionportema"
                      style={{ color: "#4f4f4f" }}
                    >
                      <MDBDropdownItem link>Buscar por tema</MDBDropdownItem>
                    </Link>
                    
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavbarItem>

              {/* COMENTARIOS */}
              <MDBNavbarItem>
                <MDBDropdown>
                  <MDBDropdownToggle tag="a" className="nav-link" role="button">
                    Comentarios
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <Link to="/altacomentario" style={{ color: "#4f4f4f" }}>
                      <MDBDropdownItem link>Añadir comentario</MDBDropdownItem>
                    </Link>
                    <Link to="/listadocomentarios" style={{ color: "#4f4f4f" }}>
                      <MDBDropdownItem link>Listar comentarios</MDBDropdownItem>
                    </Link>
                    <Link
                      to="/buscarcomentarioporid"
                      style={{ color: "#4f4f4f" }}
                    >
                      <MDBDropdownItem link>Buscar por id</MDBDropdownItem>
                    </Link>
                    <Link
                      to="/buscarcomentarioporautor"
                      style={{ color: "#4f4f4f" }}
                    >
                      <MDBDropdownItem link>
                        Buscar por autor
                      </MDBDropdownItem>
                    </Link>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavbarItem>

              {/* SWITCH - Agregado en el menú */}

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
