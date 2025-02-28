import { Box, Typography, Stack, TextField, Button } from "@mui/material";
import { apiUrl } from "../config";
import { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import AlertModal from "./AlertModal";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

/**
 * Componente `BuscarComentarioPorAutor`.
 * 
 * Este componente permite buscar comentarios realizados por un autor específico.
 * Incluye un campo de búsqueda para ingresar el nombre del autor y muestra los resultados en una tabla.
 * También maneja la validación de datos y muestra un modal de alerta en caso de errores o éxito.
 * 
 * @returns {JSX.Element} - Retorna un elemento JSX que representa el formulario de búsqueda y la tabla de resultados.
 */
function BuscarComentarioPorAutor() {
  const [nombre_usuario, setNombre_usuario] = useState(""); // Estado para almacenar el nombre de usuario
  const [datos, setDatos] = useState([]); // Estado para almacenar los comentarios encontrados

  // Estados para controlar el modal de alerta
  const [openModalAlert, setOpenModalAlert] = useState(false);
  const handleOpenModalAlert = () => setOpenModalAlert(true);
  const handleCloseModalAlert = () => setOpenModalAlert(false);
  const [msgModalAlert, setMsgModalAlert] = useState("");

  const [buscarComentarios, setBuscarComentarios] = useState(false); // Estado para controlar la búsqueda de comentarios

  // Estado para manejar la validación del campo de búsqueda
  const [validacion, setValidacion] = useState({
    nombre_usuario: false,
  });

  /**
   * Valida los datos del campo de búsqueda antes de realizar la consulta.
   * 
   * @returns {boolean} - Retorna `true` si los datos son válidos, `false` en caso contrario.
   */
  const validarDatos = () => {
    let error = { nombre_usuario: false }; // Objeto para almacenar errores
    let mensaje = "";

    // Validaciones del campo de búsqueda
    if (nombre_usuario.trim() === "") {
      error.nombre_usuario = true;
      mensaje = "Ingrese el nombre de usuario.";
    } else if (nombre_usuario.length > 15) {
      error.nombre_usuario = true;
      mensaje = "El nombre de usuario no puede superar los 15 caracteres.";
    }

    // Si hay errores, muestra el modal de alerta
    if (mensaje) {
      setMsgModalAlert(mensaje);
      handleOpenModalAlert();
      setValidacion(error);
      return false;
    }

    setValidacion({ nombre_usuario: false }); // Resetea el estado si no hay errores
    return true;
  };

  /**
   * Maneja el cambio en el campo de búsqueda.
   * 
   * @param {Object} e - Evento del cambio en el input.
   */
  const handleChange = (e) => {
    setNombre_usuario(e.target.value); // Actualiza el estado con el valor del campo
  };

  /**
   * Maneja el envío del formulario de búsqueda.
   * 
   * @param {Object} e - Evento de envío del formulario.
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    // Valida los datos antes de realizar la búsqueda
    if (validarDatos()) {
      setDatos([]); // Limpia los datos anteriores
      setBuscarComentarios(true); // Activa la búsqueda de comentarios
    }
  };

  // Efecto para realizar la búsqueda de comentarios cuando `buscarComentarios` es true
  useEffect(() => {
    if (!buscarComentarios) return;

    /**
     * Obtiene los comentarios del autor desde el backend.
     */
    async function getComentarios() {
      try {
        let response = await fetch(
          `${apiUrl}/comentario/usuario/${nombre_usuario}`
        );
        if (response.ok) {
          let data = await response.json();
          if (data.datos == null || data.datos.length === 0) {
            setMsgModalAlert("No existen comentarios para este autor");
            handleOpenModalAlert();
          } else {
            setMsgModalAlert("Comentarios encontrados");
            handleOpenModalAlert();
            setDatos(data.datos); // Actualiza el estado con los comentarios encontrados
          }
        } else {
          setMsgModalAlert("Error al buscar publicaciones");
          handleOpenModalAlert();
        }
      } catch (error) {
        setMsgModalAlert(error.message);
        handleOpenModalAlert();
      } finally {
        setBuscarComentarios(false); // Desactiva la búsqueda después de completarla
      }
    }
    getComentarios();
  }, [buscarComentarios]);

  return (
    <>
      {/* Contenedor principal del formulario y la tabla */}
      <Box
        sx={{
          padding: 2,
          backgroundColor: "rgba(255, 239, 170, 0.1)",
          minHeight: "80vh",
        }}
      >
        <Typography variant="h4" align="center" sx={{ m: 2 }}>
          Buscar comentario por autor
        </Typography>

        {/* Formulario de búsqueda */}
        <Stack
          component="form"
          onSubmit={handleSubmit}
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.92)",
            borderRadius: "10px",
            border: "2px solid rgba(210, 186, 47, 0.43)",
            boxShadow: "4px 4px 12px rgba(0, 0, 0, 0.1)",
            padding: "20px",
            width: "20%",
            margin: "auto",
          }}
        >
          <TextField
            fullWidth
            id="outlined-basic"
            label="Autor"
            variant="outlined"
            name="nombre_usuario"
            value={nombre_usuario}
            onChange={handleChange}
            error={validacion.nombre_usuario}
            helperText={validacion.nombre_usuario && "Máximo 15 caracteres"}
          />
          <Typography variant="caption" gutterBottom sx={{ display: "block" }}>
            Buscar Anónimo para mostrar comentarios sin autores
          </Typography>
          <Button
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: "rgba(210, 186, 47, 0.1)",
              color: "rgb(210, 186, 47)",
              marginTop: "20px",
            }}
            type="submit"
          >
            <SearchIcon fontSize="large" />
          </Button>
        </Stack>

        {/* Tabla de comentarios encontrados */}
        {datos.length > 0 && (
          <TableContainer
            component={Paper}
            sx={{
              mt: 4,
              borderRadius: 3,
              boxShadow: "0px 4px 10px rgba(212, 175, 55, 0.3)",
              background: "linear-gradient(135deg, #fff 30%, #f9e6b3 100%)",
              border: "1px solid #d4af37",
            }}
          >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">ID Comentario</TableCell>
                  <TableCell>Texto</TableCell>
                  <TableCell align="right">Fecha Creación</TableCell>
                  <TableCell align="right">ID Publicación</TableCell>
                  <TableCell>Autor</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {datos.map((row) => (
                  <TableRow
                    key={row.id_publicacion}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="right" component="th" scope="row">
                      {row.id_comentario}
                    </TableCell>
                    <TableCell>{row.texto}</TableCell>
                    <TableCell align="right">
                      {new Date(row.fecha_creacion).toLocaleString()}
                    </TableCell>
                    <TableCell align="right">{row.id_publicacion}</TableCell>
                    <TableCell>
                      {row.nombre_usuario ? row.nombre_usuario : "Anónimo"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>

      {/* Modal de alerta */}
      <AlertModal
        open={openModalAlert}
        handleClose={handleCloseModalAlert}
        message={msgModalAlert}
      />
    </>
  );
}

export default BuscarComentarioPorAutor;