import {
  Typography,
  TextField,
  Stack,
  Box,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import AlertModal from "./AlertModal";
import { apiUrl } from "../config";
import { useNavigate } from "react-router";

/**
 * Componente `FrmAltaPublicacion`.
 * 
 * Este componente permite a los usuarios agregar una nueva publicación.
 * Incluye un formulario con campos para el título, contenido, autor y tema.
 * También maneja la validación de datos y muestra un modal de alerta en caso de errores o éxito.
 * 
 * @returns {JSX.Element} - Retorna un elemento JSX que representa el formulario de alta de publicaciones.
 */
function FrmAltaPublicacion() {
  // Lista de temas disponibles para las publicaciones
  const temas = [
    "Actualidad",
    "Tecnología",
    "Deportes",
    "Entretenimiento",
    "Política",
    "Educación",
    "Salud",
    "Negocios",
    "Ciencia",
    "Medio Ambiente",
    "Arte y Cultura",
    "Viajes",
    "Moda",
    "Gastronomía",
    "Humor",
    "Videojuegos",
    "Automóviles",
    "Fitness",
    "Relaciones",
    "Mascotas",
  ];

  const navigate = useNavigate(); // Hook para navegar entre rutas

  // Estado para almacenar los datos del formulario
  const [datos, setDatos] = useState({
    titulo: "",
    texto: "",
    nombre_usuario: "",
    tema: "",
  });

  // Estado para manejar la validación de los campos
  const [validacion, setValidacion] = useState({
    titulo: false,
    texto: false,
    nombre_usuario: false,
    tema: false,
  });

  // Estados para controlar el modal de alerta
  const [openModalAlert, setOpenModalAlert] = useState(false);
  const handleOpenModalAlert = () => setOpenModalAlert(true);
  const handleCloseModalAlert = () => setOpenModalAlert(false);
  const [msgModalAlert, setMsgModalAlert] = useState("");

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
    if (!datos.titulo || !datos.texto || !datos.tema) {
      mensaje = "Todos los campos son obligatorios (excepto autor)";
    } else if (datos.titulo.length > 150) {
      mensaje = "El título no puede superar los 150 caracteres";
      errores.titulo = true;
    } else if (datos.texto.length > 65000) {
      mensaje = "El texto no puede superar los 65000 caracteres";
      errores.texto = true;
    } else if (datos.tema.length > 20) {
      mensaje = "El tema no puede superar los 20 caracteres";
      errores.tema = true;
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
      const response = await fetch(apiUrl + "/publicacion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datos), // Envía los datos en formato JSON
      });

      if (response.ok) {
        const respuesta = await response.json();
        setMsgModalAlert("Publicación insertada exitosamente");
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
        }}
      >
        <Typography variant="h4" align="center" sx={{ m: 2 }}>
          Añadir Publicación
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
            {/* Campo de título */}
            <Grid size={12}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Titulo"
                variant="outlined"
                name="titulo"
                value={datos.titulo}
                onChange={handleChange}
                error={validacion.titulo}
                helperText={validacion.titulo && "Máximo 150 caracteres"}
              />
            </Grid>

            {/* Campo de contenido */}
            <Grid size={12}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Contenido"
                variant="outlined"
                name="texto"
                value={datos.texto}
                onChange={handleChange}
                multiline
                rows={12}
                error={validacion.texto}
                helperText={validacion.texto && "Texto demasiado largo"}
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
                helperText={validacion.nombre_usuario && "Máximo 15 caracteres"}
              />
            </Grid>

            {/* Selector de tema */}
            <Grid size={{ xs: 12, sm: 6, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel id="tema-label">Tema</InputLabel>
                <Select
                  labelId="tema-label"
                  id="tema"
                  value={datos.tema}
                  onChange={handleChange}
                  name="tema"
                  label="Tema"
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        maxHeight: 200, // Limita la altura del menú desplegable
                      },
                    },
                  }}
                >
                  {temas.map((tema, index) => (
                    <MenuItem key={index} value={tema}>
                      {tema}
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

export default FrmAltaPublicacion;