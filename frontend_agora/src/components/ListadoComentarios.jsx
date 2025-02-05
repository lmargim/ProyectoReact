import { useState, useEffect } from "react";
import { apiUrl } from "../config";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router";
import AlertModal from "./AlertModal";

function ListadoComentarios() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);

  const [openModalAlert, setOpenModalAlert] = useState(false);
  const handleOpenModalAlert = () => setOpenModalAlert(true);
  const handleCloseModalAlert = () => setOpenModalAlert(false);
  const [msgModalAlert, setMsgModalAlert] = useState("");

  useEffect(() => {
    async function getComentarios() {
      let response = await fetch(apiUrl + "/comentario");

      if (response.ok) {
        let data = await response.json();
        setRows(data.datos);
      }
    }
    getComentarios();
  }, []); // Se ejecuta solo en el primer renderizado

  const handleDelete = async (idComentario) => {
    let response = await fetch(apiUrl + "/comentario/" + idComentario, {
      method: "DELETE",
    });
    if (response.ok) {
      // Utilizando filter creo un array sin el plato borrado
      const filasTrasBorrado = rows.filter(
        (comentario) => comentario.id_comentario != idComentario
      );
      // Establece los datos de nuevo para provocar un renderizado
      setRows(filasTrasBorrado);
      setMsgModalAlert("Comentario eliminando correctamente");
      handleOpenModalAlert();
    }
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "70vh",
          padding: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "rgba(255, 239, 170, 0.1)",
        }}
      >
        <Typography variant="h4" align="center" sx={{ m: 2 }}>
          Listado de comentarios
        </Typography>

        <TableContainer
          component={Paper}
          sx={{
            mb: 2,
            borderRadius: 3,
            boxShadow: "0px 4px 10px rgba(212, 175, 55, 0.3)",
            background: "linear-gradient(135deg, #fff 30%, #f9e6b3 100%)",
            border: "1px solid #d4af37",
          }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">ID COMENTARIO</TableCell>
                <TableCell>COMENTARIO</TableCell>
                <TableCell align="right">FECHA CREACIÓN</TableCell>
                <TableCell align="right">ID PUBLICACION</TableCell>
                <TableCell>NOMBRE USUARIO</TableCell>
                <TableCell align="center">ACCIÓN</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
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
                  <TableCell align="center" sx={{}}>
                    <Button
                      variant="contained"
                      startIcon=<EditIcon />
                      onClick={() =>
                        navigate(`/modificarcomentario/${row.id_comentario}`)
                      }
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(row.id_comentario)}
                      sx={{ ml: 2 }}
                      variant="contained"
                      color="error"
                      startIcon=<DeleteIcon />
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <AlertModal
        open={openModalAlert}
        handleClose={handleCloseModalAlert}
        message={msgModalAlert}
      />
    </>
  );
}

export default ListadoComentarios;
