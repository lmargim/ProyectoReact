import {
  Box,
  Typography,
  Stack,
  TextField,
  Button,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router";
import { apiUrl } from "../config";
import AlertModal from "./AlertModal";

/**
 * Componente `AltaComentario`.
 * 
 * Este componente permite a los usuarios agregar un nuevo comentario a una publicación existente.
 * Incluye un formulario con campos para el comentario, el autor y la selección de la publicación.
 * También maneja la validación de datos y muestra un modal de alerta en caso de errores o éxito.
 * 
 * @returns {JSX.Element} - Retorna un elemento JSX que representa el formulario de alta de comentarios.
 */
function AltaComentario() {
  const navigate = useNavigate(); // Hook para navegar entre rutas

  // Estado para almacenar los datos del formulario
  const [datos, setDatos] = useState({
    texto: "",
    id_publicacion: "",
    nombre_usuario: "",
  });

  const [publicaciones, setPublicaciones] = useState([]); // Estado para almacenar la lista de publicaciones
  const [publicacionSeleccionada, setPublicacionSeleccionada] = useState([]); // Estado para la publicación seleccionada

  // Estados para controlar el modal de alerta
  const [openModalAlert, setOpenModalAlert] = useState(false);
  const handleOpenModalAlert = () => setOpenModalAlert(true);
  const handleCloseModalAlert = () => setOpenModalAlert(false);
  const [msgModalAlert, setMsgModalAlert] = useState("");

  // Estado para manejar la validación de los campos
  const [validacion, setValidacion] = useState({
    texto: false,
    nombre_usuario: false,
  });

  /**
   * Maneja el cambio en el campo de selección de publicación.
   * 
   * @param {Object} e - Evento del cambio en el select.
   */
  const handleChangeSelect = (e) => {
    setPublicacionSeleccionada(e.target.value); // Actualiza la publicación seleccionada
    setDatos({
      ...datos,
      id_publicacion: e.target.value, // Actualiza el ID de la publicación en los datos
    });
  };

  /**
   * Maneja el cambio en los campos del formulario.
   * 
   * @param {Object} e - Evento del cambio en el input.
   */
  const handleChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value, // Actualiza el estado con el valor del campo modificado
    });
  };

  // Efecto para cargar las publicaciones al montar el componente
  useEffect(() => {
    async function getPublicaciones() {
      let response = await fetch(apiUrl + "/publicacion"); // Hace la petición al backend

      if (response.ok) {
        let data = await response.json(); // Convierte la respuesta a JSON
        setPublicaciones(data.datos); // Actualiza el estado con las publicaciones obtenidas
      }
    }

    getPublicaciones(); // Llama a la función para obtener las publicaciones
  }, []);

  /**
   * Valida los datos del formulario antes de enviarlos.
   * 
   * @returns {boolean} - Retorna `true` si los datos son válidos, `false` en caso contrario.
   */
  const validarDatos = () => {
    let errores = {};
    let mensaje = "";

    // Validaciones de campos obligatorios y longitud
    if (!datos.texto || !datos.id_publicacion) {
      mensaje = "Los campos comentario y publicación son obligatorios";
    } else if (datos.texto.length > 300) {
      mensaje = "El comentario no puede superar los 300 caracteres";
      errores.texto = true;
    } else if (datos.nombre_usuario && datos.nombre_usuario.length > 15) {
      mensaje = "El autor no puede superar los 15 caracteres";
      errores.nombre_usuario = true;
    }

    // Si hay errores, muestra el modal de alerta
    if (mensaje) {
      setMsgModalAlert(mensaje);
      handleOpenModalAlert();
      setValidacion(errores);
      return false;
    }

    setValidacion({}); // Limpia los errores si no hay problemas
    return true;
  };

  /**
   * Maneja el envío del formulario.
   * 
   * @param {Object} e - Evento de envío del formulario.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Valida los datos antes de enviar
    if (validarDatos()) {
      const response = await fetch(apiUrl + "/comentario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datos), // Envía los datos en formato JSON
      });

      if (response.ok) {
        const respuesta = await response.json();
        setMsgModalAlert("Comentario insertado exitosamente");
        handleOpenModalAlert();

        // Redirige a la página principal después de 1.5 segundos
        if (respuesta.ok) {
          setTimeout(() => {
            navigate("/");
          }, 1500);
        }
      }
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
          Añadir Comentario
        </Typography>

        {/* Formulario */}
        <Stack component="form" onSubmit={handleSubmit}>
          <Grid
            spacing={2}
            container
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.92)",
              borderRadius: "10px",
              border: "2px solid rgba(210, 186, 47, 0.43)",
              boxShadow: "4px 4px 12px rgba(0, 0, 0, 0.1)",
              padding: "20px",
            }}
          >
            {/* Campo de comentario */}
            <Grid size={12}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Comentario"
                variant="outlined"
                name="texto"
                value={datos.texto}
                onChange={handleChange}
                multiline
                rows={4}
                error={validacion.texto}
                helperText={validacion.texto && "Máximo 300 carácteres"}
              />
            </Grid>

            {/* Campo de autor */}
            <Grid size={{ xs: 12, sm: 6, md: 6 }}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Autor"
                variant="outlined"
                name="nombre_usuario"
                value={datos.nombre_usuario}
                onChange={handleChange}
                error={validacion.nombre_usuario}
                helperText={validacion.nombre_usuario && "Máximo 15 carácteres"}
              />
            </Grid>

            {/* Selector de publicación */}
            <Grid size={{ xs: 12, sm: 6, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel id="publicacion-label">Publicación</InputLabel>
                <Select
                  labelId="publicacion-label"
                  id="publicacion"
                  value={publicacionSeleccionada}
                  onChange={handleChangeSelect}
                  name="publicacion"
                  label="Publicacion"
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        maxHeight: 200, // Limita la altura del menú desplegable
                      },
                    },
                  }}
                >
                  {publicaciones.map((publicacion) => (
                    <MenuItem
                      key={publicacion.id_publicacion}
                      value={publicacion.id_publicacion}
                    >
                      {publicacion.titulo}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Botón de envío */}
            <Grid size={12}>
              <Button
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: "rgba(210, 186, 47, 0.1)",
                  color: "rgb(210, 186, 47)",
                }}
                type="submit"
              >
                <AddIcon fontSize="large" />
              </Button>
            </Grid>
          </Grid>
        </Stack>
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

export default AltaComentario;