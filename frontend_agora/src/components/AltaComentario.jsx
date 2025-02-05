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

function AltaComentario() {
  const navigate = useNavigate();

  const [datos, setDatos] = useState({
    texto: "",
    id_publicacion: "",
    nombre_usuario: "",
  });

  const [publicaciones, setPublicaciones] = useState([]);
  const [publicacionSeleccionada, setPublicacionSeleccionada] = useState([]);

  const [openModalAlert, setOpenModalAlert] = useState(false);
  const handleOpenModalAlert = () => setOpenModalAlert(true);
  const handleCloseModalAlert = () => setOpenModalAlert(false);
  const [msgModalAlert, setMsgModalAlert] = useState("");

  const [validacion, setValidacion] = useState({
    texto: false,
    nombre_usuario: false,
  });

  const handleChangeSelect = (e) => {
    setPublicacionSeleccionada(e.target.value);
    setDatos({
      ...datos,
      id_publicacion: e.target.value,
    });
  };

  const handleChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
    console.log("Idpublicacion", datos.id_publicacion);
  };

  useEffect(() => {
    async function getPublicaciones() {
      let response = await fetch(apiUrl + "/publicacion");

      if (response.ok) {
        let data = await response.json();
        setPublicaciones(data.datos);
      }
    }

    getPublicaciones();
  }, []);


  const validarDatos = () => {
    let errores = {};
    let mensaje = "";
    if (!datos.texto || !datos.id_publicacion) {
      mensaje = "Los campos comentario y publicacion son obligatorios";
    } else if (datos.texto.length > 300) {
      mensaje = "El comentario no puede superar los 300 caracteres";
      errores.texto = true;
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
    e.preventDefault();
    console.log(datos);
    // Primero validamos campos
    if (validarDatos()) {
      console.log("Validado correctamente, mandamos peticion al back");
      const response = await fetch(apiUrl + "/comentario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datos),
      });
      if (response.ok) {
        const respuesta = await response.json();
        console.log("Comentario insertado exitosamente");
        setMsgModalAlert("Comentario insertado exitosamente");
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
          height: "70vh",
        }}
      >
        <Typography variant="h4" align="center" sx={{ m: 2 }}>
          Añadir Comentario
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
                helperText={validacion.nombre_usuario && "Maximo 15 carácteres"}
              />
            </Grid>
            
            <Grid size={{ xs: 12, sm: 6, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel id="publicacion-label">Publicacion</InputLabel>
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
                        maxHeight: 200,
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
      <AlertModal
        open={openModalAlert}
        handleClose={handleCloseModalAlert}
        message={msgModalAlert}
      />
    </>
  );
}

export default AltaComentario;
