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

function BuscarPublicacionPorId() {
  const [datos, setDatos] = useState({ id: "" });
  const [validacion, setValidacion] = useState({ id: false });
  const [openModalAlert, setOpenModalAlert] = useState(false);
  const [msgModalAlert, setMsgModalAlert] = useState("");
  const [open, setOpen] = useState(false);
  const [buscarPublicacion, setBuscarPublicacion] = useState(false);
  const [publicacion, setPublicacion] = useState(null);

  const handleChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const validarDatos = () => {
    let mensaje = "";
    let errores = {};

    if (!datos.id) {
      mensaje = "Debe ingresar un ID de publicación.";
      errores.id = true;
    } else if (isNaN(datos.id) || datos.id < 1) {
      mensaje = "Debe ingresar un número entero positivo.";
      errores.id = true;
    }

    if (mensaje) {
      setMsgModalAlert(mensaje);
      setOpenModalAlert(true);
      setValidacion(errores);
      return false;
    }

    setValidacion({});
    return true;
  };

  useEffect(() => {
    if (!buscarPublicacion) return;

    async function getPublicacion() {
      try {
        let response = await fetch(`${apiUrl}/publicacion/id/${datos.id}`);
        if (!response.ok) {
          throw new Error("No se encontró la publicación.");
        }
        let data = await response.json();
        setPublicacion(data.datos);
        setOpen(true);
      } catch (error) {
        setMsgModalAlert(error.message);
        setOpenModalAlert(true);
      } finally {
        setBuscarPublicacion(false);
      }
    }

    getPublicacion();
  }, [buscarPublicacion]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validarDatos()) {
      setBuscarPublicacion(true);
    }
  };

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
          Buscar publicación por ID
        </Typography>
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
              <Typography id="modal-tittle" variant="h6" sx={{ mt: 2 }}>
                {publicacion.titulo}
              </Typography>
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
          <Button variant="text" onClick={() => setOpen(false)}>Cerrar</Button>
        </Box>
      </Modal>

      <AlertModal
        open={openModalAlert}
        handleClose={() => setOpenModalAlert(false)}
        message={msgModalAlert}
      />
    </>
  );
}

export default BuscarPublicacionPorId;
