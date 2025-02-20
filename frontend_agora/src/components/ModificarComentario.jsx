import { Box, Typography, Stack, TextField, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useNavigate, useParams } from "react-router";
import { apiUrl } from "../config";
import { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import AlertModal from "./AlertModal";

function ModificarComentario() {
  const params = useParams();
  const navigate = useNavigate();

  const [openModalAlert, setOpenModalAlert] = useState(false);
  const handleOpenModalAlert = () => setOpenModalAlert(true);
  const handleCloseModalAlert = () => setOpenModalAlert(false);
  const [msgModalAlert, setMsgModalAlert] = useState("");

  const [validacion, setValidacion] = useState({
    texto: false,
    nombre_usuario: false,
  });

  const [datos, setDatos] = useState({
    id_comentario: params.idcomentario,
    texto: "",
    id_publicacion: "",
    nombre_usuario: "",
  });

  const handleChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };
  {
    /* VALIDACION DE DATOS (MODIFICAR COMENTARIO) */
  }
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
  {
    /* FETCH PARA OBTENER DATOS DEL COMENTARIO A EDITAR */
  }
  useEffect(() => {
    async function getComentario() {
      try {
        let response = await fetch(`${apiUrl}/comentario/id/${params.idcomentario}`);
        if (response.ok) {
          let data = await response.json();
          console.log("Comentario cargado:", data.datos);
          setDatos(data.datos);
        } else if (response.status === 404) {
          let data = await response.json();
          setMsgModalAlert(data.message);
          handleOpenModalAlert();
          navigate("/");
        }
      } catch (error) {
        console.error("Error al obtener el comentario:", error);
        setMsgModalAlert("Error al cargar el comentario.");
        handleOpenModalAlert();
        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    }
    getComentario();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validamos
    if (validarDatos) { 
        try {
            const response = await fetch(`${apiUrl}/comentario/${params.idcomentario}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(datos),
            });
            if (response.ok) {
                // 204 No content alert("Actualización correcta");
                setMsgModalAlert("Actualización correcta");
                handleOpenModalAlert();
                // alert("Actualizacion correcta")
                setTimeout(() => {
                  navigate(-1); // Volver a la ruta anterior
                }, 1500);
              } else {
                // 404 Not Found plato no modificado o no encontrado
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


  console.log(datos);
  return (
    <>
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
                helperText={validacion.nombre_usuario && "Maximo 15 carácteres"}
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

      <AlertModal
        open={openModalAlert}
        handleClose={handleCloseModalAlert}
        message={msgModalAlert}
      />
    </>
  );
}

export default ModificarComentario;
