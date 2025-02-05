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
function BuscarComentarioPorAutor() {
  const [nombre_usuario, setNombre_usuario] = useState("");
  const [datos, setDatos] = useState([]);

  const [openModalAlert, setOpenModalAlert] = useState(false);
  const handleOpenModalAlert = () => setOpenModalAlert(true);
  const handleCloseModalAlert = () => setOpenModalAlert(false);
  const [msgModalAlert, setMsgModalAlert] = useState("");

  const [buscarComentarios, setBuscarComentarios] = useState(false);

  const [validacion, setValidacion] = useState({
    nombre_usuario: false,
  });
  const validarDatos = () => {
    let error = { nombre_usuario: false }; // Asegura que tenga estructura válida
    let mensaje = "";

    if (nombre_usuario.trim() === "") {
      error.nombre_usuario = true;
      mensaje = "Ingrese el nombre de usuario.";
    } else if (nombre_usuario.length > 15) {
      error.nombre_usuario = true;
      mensaje = "El nombre de usuario no puede superar los 15 caracteres.";
    }

    if (mensaje) {
      setMsgModalAlert(mensaje);
      handleOpenModalAlert();
      setValidacion(error); // Asegura que los errores sean booleanos
      return false;
    }

    setValidacion({ nombre_usuario: false }); // Resetea el estado si no hay errores
    return true;
  };

  const handleChange = (e) => {
    setNombre_usuario(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validarDatos()) {
      setDatos([]);
      setBuscarComentarios(true);
      
    }
  };

  useEffect(() => {
    if (!buscarComentarios) return;
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
            setDatos(data.datos);
          }
        } else {
          setMsgModalAlert("Error al buscar publicaciones");
          handleOpenModalAlert();
        }
      } catch (error) {
        setMsgModalAlert(error.message);
        handleOpenModalAlert();
      } finally {
        setBuscarComentarios(false);
      }
    }
    getComentarios();
  }, [buscarComentarios]);

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
          Buscar comentario por autor
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
            label="Autor"
            variant="outlined"
            name="nombre_usuario"
            value={nombre_usuario}
            onChange={handleChange}
            error={validacion.nombre_usuario}
            helperText={validacion.nombre_usuario && "Maximo 15 carácteres"}
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

        {/* Tabla de publicaciones */}
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
                    <TableCell>{row.nombre_usuario ? row.nombre_usuario : "Anónimo"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
      <AlertModal
        open={openModalAlert}
        handleClose={handleCloseModalAlert}
        message={msgModalAlert}
      />
    </>
  );
}

export default BuscarComentarioPorAutor;
