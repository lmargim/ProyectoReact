import {
  Box,
  Typography,
  Stack,
  TextField,
  Button,
  Modal,
} from "@mui/material";
import { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import AlertModal from "./AlertModal";
import { apiUrl } from "../config";

/**
 * Componente `BuscarComentarioPorId`.
 * 
 * Este componente permite buscar un comentario específico por su ID.
 * Incluye un campo de búsqueda para ingresar el ID del comentario y muestra los detalles del comentario en un modal.
 * También maneja la validación de datos y muestra un modal de alerta en caso de errores o éxito.
 * 
 * @returns {JSX.Element} - Retorna un elemento JSX que representa el formulario de búsqueda y el modal de detalles.
 */
function BuscarComentarioPorId() {
  const [datos, setDatos] = useState({ id: "" }); // Estado para almacenar el ID del comentario
  const [validacion, setValidacion] = useState({ id: false }); // Estado para manejar la validación del campo de búsqueda

  // Estados para controlar el modal de alerta
  const [openModalAlert, setOpenModalAlert] = useState(false);
  const [msgModalAlert, setMsgModalAlert] = useState("");

  const [open, setOpen] = useState(false); // Estado para controlar la visibilidad del modal de detalles
  const [buscarComentario, setBuscarComentario] = useState(false); // Estado para activar la búsqueda del comentario
  const [comentario, setComentario] = useState(null); // Estado para almacenar los detalles del comentario encontrado

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

  // Efecto para realizar la búsqueda del comentario cuando `buscarComentario` es true
  useEffect(() => {
    if (!buscarComentario) return;

    /**
     * Obtiene los detalles del comentario desde el backend.
     */
    async function getPublicacion() {
      try {
        let response = await fetch(`${apiUrl}/comentario/id/${datos.id}`);
        if (!response.ok) {
          throw new Error("No se encontró el comentario.");
        }
        let data = await response.json();
        setComentario(data.datos); // Actualiza el estado con los detalles del comentario
        setOpen(true); // Abre el modal de detalles
      } catch (error) {
        setMsgModalAlert(error.message);
        setOpenModalAlert(true);
      } finally {
        setBuscarComentario(false); // Desactiva la búsqueda después de completarla
      }
    }

    getPublicacion();
  }, [buscarComentario]);

  /**
   * Maneja el envío del formulario de búsqueda.
   * 
   * @param {Object} e - Evento de envío del formulario.
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    // Valida los datos antes de realizar la búsqueda
    if (validarDatos()) {
      setBuscarComentario(true); // Activa la búsqueda del comentario
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
          Buscar comentario por ID
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
            label="ID Comentario"
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

      {/* Modal de detalles del comentario */}
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
          {comentario ? (
            <>
              {/* Nombre del autor o "Anónimo" */}
              <Typography id="modal-tittle" variant="h6" sx={{ mt: 2 }}>
                {comentario.nombre_usuario
                  ? comentario.nombre_usuario
                  : "Anónimo"}
              </Typography>

              {/* Texto del comentario */}
              <Typography
                id="modal-description"
                sx={{ mt: 1, fontSize: 14, color: "gray" }}
              >
                {comentario.texto}
              </Typography>

              {/* ID de la publicación asociada */}
              <Typography
                id="modal-description"
                sx={{ mt: 1, fontSize: 14, color: "gray" }}
              >
                Id Publicacion: {comentario.id_publicacion}
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

export default BuscarComentarioPorId;