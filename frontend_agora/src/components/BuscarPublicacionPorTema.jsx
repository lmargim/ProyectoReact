import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect } from "react";
import AlertModal from "./AlertModal";
import { apiUrl } from "../config";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function BuscarPublicacionPorTema() {
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
  const [tema, setTema] = useState("");
  const [buscarPublicaciones, setBuscarPublicaciones] = useState(false);

  const [openModalAlert, setOpenModalAlert] = useState(false);
  const handleOpenModalAlert = () => setOpenModalAlert(true);
  const handleCloseModalAlert = () => setOpenModalAlert(false);
  const [msgModalAlert, setMsgModalAlert] = useState("");

  const [datos, setDatos] = useState([]);
  // Cuando cambie el select, se setea la variable tema al tema elegido
  const handleChange = (e) => {
    setTema(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Buscando publicaciones por tema:", tema);
    setDatos([]); // Limpia la tabla antes de la nueva búsqueda
    setBuscarPublicaciones(true);
  };

  useEffect(() => {
    if (!buscarPublicaciones) return;
    async function getPublicaciones() {
      try {
        let response = await fetch(`${apiUrl}/publicacion/tema/${tema}`);
        if (response.ok) {
          let data = await response.json();
          if (data.datos == null || data.datos.length === 0) {
            setMsgModalAlert("No existen publicaciones para ese tema");
            handleOpenModalAlert();
          } else {
            setMsgModalAlert("Publicaciones encontradas");
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
        setBuscarPublicaciones(false);
      }
    }
    getPublicaciones();
  }, [buscarPublicaciones]);

  return (
    <>
      <Box
        sx={{
          padding: 2,
          backgroundColor: "rgba(255, 239, 170, 0.1)",
          minHeight: "70vh",
        }}
      >
        <Typography variant="h4" align="center" sx={{ m: 2 }}>
          Buscar publicacion por tema
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
          <FormControl fullWidth>
            <InputLabel id="tema-label">Tema</InputLabel>
            <Select
              labelId="tema-label"
              id="tema"
              value={tema}
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
                  <TableCell align="right">ID Publicacion</TableCell>
                  <TableCell>Titulo</TableCell>
                  <TableCell>Texto</TableCell>
                  <TableCell align="right">Fecha Creación</TableCell>
                  <TableCell>Autor</TableCell>
                  <TableCell>Tema</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {datos.map((row) => (
                  <TableRow
                    key={row.id_publicacion}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="right" component="th" scope="row">
                      {row.id_publicacion}
                    </TableCell>
                    <TableCell>{row.titulo}</TableCell>
                    <TableCell>{row.texto}</TableCell>
                    <TableCell>{new Date(row.fecha_creacion).toLocaleString()}</TableCell>
                    <TableCell>{row.nombre_usuario ? row.nombre_usuario : "Anónimo"}</TableCell>
                    <TableCell>{row.tema}</TableCell>
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

export default BuscarPublicacionPorTema;
