import { Box, Typography, Stack, TextField, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useNavigate, useParams } from "react-router";
import { apiUrl } from "../config";
import { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import AlertModal from "./AlertModal";

/**
 * Componente `ModificarComentario`.
 * 
 * Este componente permite modificar un comentario existente.
 * Incluye un formulario para editar el texto y el autor del comentario, y maneja la validación de datos.
 * También muestra un modal de alerta en caso de errores o éxito.
 * 
 * @returns {JSX.Element} - Retorna un elemento JSX que representa el formulario de modificación de comentarios.
 */
function ModificarComentario() {
  const params = useParams(); // Hook para obtener los parámetros de la URL
  const navigate = useNavigate(); // Hook para navegar entre rutas

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

  // Estado para almacenar los datos del comentario
  const [datos, setDatos] = useState({
    id_comentario: params.idcomentario, // ID del comentario obtenido de la URL
    texto: "",
    id_publicacion: "",
    nombre_usuario: "",
  });

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

  // Efecto para cargar los datos del comentario al montar el componente
  useEffect(() => {
    async function getComentario() {
      try {
        let response = await fetch(`${apiUrl}/comentario/id/${params.idcomentario}`);
        if (response.ok) {
          let data = await response.json();
          console.log("Comentario cargado:", data.datos);
          setDatos(data.datos); // Actualiza el estado con los datos del comentario
        } else if (response.status === 404) {
          let data = await response.json();
          setMsgModalAlert(data.message);
          handleOpenModalAlert();
          navigate("/"); // Redirige a la página principal si el comentario no existe
        }
      } catch (error) {
        console.error("Error al obtener el comentario:", error);
        setMsgModalAlert("Error al cargar el comentario.");
        handleOpenModalAlert();
        setTimeout(() => {
          navigate("/"); // Redirige a la página principal después de 1.5 segundos
        }, 1500);
      }
    }
    getComentario();
  }, []);

  /**
   * Maneja el envío del formulario.
   * 
   * @param {Object} e - Evento de envío del formulario.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Valida los datos antes de enviar
    if (validarDatos()) {
      try {
        const response = await fetch(`${apiUrl}/comentario/${params.idcomentario}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datos), // Envía los datos en formato JSON
        });
        if (response.ok) {
          setMsgModalAlert("Actualización correcta");
          handleOpenModalAlert();
          setTimeout(() => {
            navigate(-1); // Redirige a la página anterior después de 1.5 segundos
          }, 1500);
        } else {
          const data = await response.json();
          setMsgModalAlert(data.mensaje);
          handleOpenModalAlert();
        }
      } catch (error) {
        console.error("Error:", error.message);
        setMsgModalAlert(error.message);
        handleOpenModalAlert();
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
          Modificar comentario
        </Typography>

        {/* Formulario de modificación */}
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
                helperText={validacion.texto && "Máximo 300 caracteres"}
              />
            </Grid>

            {/* Campo de autor */}
            <Grid size={12}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Autor"
                variant="outlined"
                name="nombre_usuario"
                value={datos.nombre_usuario}
                onChange={handleChange}
                error={validacion.nombre_usuario}
                helperText={validacion.nombre_usuario && "Máximo 15 caracteres"}
              />
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

export default ModificarComentario;