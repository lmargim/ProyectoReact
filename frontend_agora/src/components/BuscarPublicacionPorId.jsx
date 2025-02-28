import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { apiUrl } from "../config";
import AlertModal from "./AlertModal";

/**
 * Componente `BuscarPublicacionPorId`.
 * 
 * Este componente permite buscar una publicación específica por su ID.
 * Incluye un campo de búsqueda para ingresar el ID de la publicación y muestra los detalles de la publicación en un modal.
 * También maneja la validación de datos y muestra un modal de alerta en caso de errores o éxito.
 * 
 * @returns {JSX.Element} - Retorna un elemento JSX que representa el formulario de búsqueda y el modal de detalles.
 */
function BuscarPublicacionPorId() {
  const [datos, setDatos] = useState({ id: "" }); // Estado para almacenar el ID de la publicación
  const [validacion, setValidacion] = useState({ id: false }); // Estado para manejar la validación del campo de búsqueda

  // Estados para controlar el modal de alerta
  const [openModalAlert, setOpenModalAlert] = useState(false);
  const [msgModalAlert, setMsgModalAlert] = useState("");

  const [open, setOpen] = useState(false); // Estado para controlar la visibilidad del modal de detalles
  const [buscarPublicacion, setBuscarPublicacion] = useState(false); // Estado para activar la búsqueda de la publicación
  const [publicacion, setPublicacion] = useState(null); // Estado para almacenar los detalles de la publicación encontrada

  /**
   * Maneja el cambio en el campo de búsqueda.
   * 
   * @param {Object} e - Evento del cambio en el input.
   */
  const handleChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value }); // Actualiza el estado con el valor del campo
  };

  /**
   * Valida los datos del campo de búsqueda antes de realizar la consulta.
   * 
   * @returns {boolean} - Retorna `true` si los datos son válidos, `false` en caso contrario.
   */
  const validarDatos = () => {
    let mensaje = "";
    let errores = {};

    // Validaciones del campo de búsqueda
    if (!datos.id) {
      mensaje = "Debe ingresar un ID de publicación.";
      errores.id = true;
    } else if (isNaN(datos.id) || datos.id < 1) {
      mensaje = "Debe ingresar un número entero positivo.";
      errores.id = true;
    }

    // Si hay errores, muestra el modal de alerta
    if (mensaje) {
      setMsgModalAlert(mensaje);
      setOpenModalAlert(true);
      setValidacion(errores);
      return false;
    }

    setValidacion({}); // Limpia los errores si no hay problemas
    return true;
  };

  // Efecto para realizar la búsqueda de la publicación cuando `buscarPublicacion` es true
  useEffect(() => {
    if (!buscarPublicacion) return;

    /**
     * Obtiene los detalles de la publicación desde el backend.
     */
    async function getPublicacion() {
      try {
        let response = await fetch(`${apiUrl}/publicacion/id/${datos.id}`);
        if (!response.ok) {
          throw new Error("No se encontró la publicación.");
        }
        let data = await response.json();
        setPublicacion(data.datos); // Actualiza el estado con los detalles de la publicación
        setOpen(true); // Abre el modal de detalles
      } catch (error) {
        setMsgModalAlert(error.message);
        setOpenModalAlert(true);
      } finally {
        setBuscarPublicacion(false); // Desactiva la búsqueda después de completarla
      }
    }

    getPublicacion();
  }, [buscarPublicacion]);

  /**
   * Maneja el envío del formulario de búsqueda.
   * 
   * @param {Object} e - Evento de envío del formulario.
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    // Valida los datos antes de realizar la búsqueda
    if (validarDatos()) {
      setBuscarPublicacion(true); // Activa la búsqueda de la publicación
    }
  };

  return (
    <>
      {/* Contenedor principal del formulario */}
      <Box
        sx={{
          padding: 2,
          backgroundColor: "rgba(255, 239, 170, 0.1)",
          minHeight: "80vh",
        }}
      >
        <Typography variant="h4" align="center" sx={{ m: 2 }}>
          Buscar publicación por ID
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
            label="ID Publicación"
            variant="outlined"
            name="id"
            value={datos.id}
            onChange={handleChange}
            error={validacion.id}
            helperText={
              validacion.id && "Debe ingresar un número entero positivo."
            }
          />
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
      </Box>

      {/* Modal de detalles de la publicación */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
            padding: "24px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {publicacion ? (
            <>
              {/* Título de la publicación */}
              <Typography id="modal-tittle" variant="h6" sx={{ mt: 2 }}>
                {publicacion.titulo}
              </Typography>

              {/* Texto de la publicación */}
              <Typography
                id="modal-description"
                sx={{ mt: 1, fontSize: 14, color: "gray" }}
              >
                {publicacion.texto}
              </Typography>
            </>
          ) : (
            <Typography>Cargando...</Typography>
          )}

          {/* Botón para cerrar el modal */}
          <Button variant="text" onClick={() => setOpen(false)}>
            Cerrar
          </Button>
        </Box>
      </Modal>

      {/* Modal de alerta */}
      <AlertModal
        open={openModalAlert}
        handleClose={() => setOpenModalAlert(false)}
        message={msgModalAlert}
      />
    </>
  );
}

export default BuscarPublicacionPorId;