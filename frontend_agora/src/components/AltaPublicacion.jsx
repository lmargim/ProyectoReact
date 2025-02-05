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

function FrmAltaPublicacion() {
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
  const navigate = useNavigate();
  const [datos, setDatos] = useState({
    titulo: "",
    texto: "",
    nombre_usuario: "",
    tema: "",
  });

  const [validacion, setValidacion] = useState({
    titulo: false,
    texto: false,
    nombre_usuario: false,
    tema: false,
  });

  const [openModalAlert, setOpenModalAlert] = useState(false);
  const handleOpenModalAlert = () => setOpenModalAlert(true);
  const handleCloseModalAlert = () => setOpenModalAlert(false);
  const [msgModalAlert, setMsgModalAlert] = useState("");

  const handleChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  const validarDatos = () => {
    let errores = {};
    let mensaje = "";

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

    if (mensaje) {
      setMsgModalAlert(mensaje);
      handleOpenModalAlert();
      setValidacion(errores);
      return false;
    }

    setValidacion({});
    return true;
  };

  const handleSubmit = async (e) => {
    //e -> formulario
    e.preventDefault();
    console.log(datos);

    // Primero validamos campos
    if (validarDatos()) {
      console.log("Validado correctamente, mandamos peticion al back");
      const response = await fetch(apiUrl + "/publicacion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datos),
      });
      if (response.ok) {
        const respuesta = await response.json();
        console.log("Publicacion insertada exitosamente");
        setMsgModalAlert("Publicación insertada exitosamente");
        handleOpenModalAlert();
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
      <Box
        sx={{
          padding: 2,
          backgroundColor: "rgba(255, 239, 170, 0.1)",
        }}
      >
        <Typography variant="h4" align="center" sx={{ m: 2 }}>
          Añadir Publicación
        </Typography>

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
            {/* Título */}
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

            {/* Contenido */}
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

            {/* Nombre de Usuario */}
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

            {/* Tema */}
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
                        maxHeight: 200,
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
      <AlertModal
          open={openModalAlert}
          handleClose={handleCloseModalAlert}
          message={msgModalAlert}
        />
    </>
  );
}

export default FrmAltaPublicacion;
