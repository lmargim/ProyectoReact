import { useState, useEffect } from "react";
import { apiUrl } from "../config";
import {
  Typography,
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AlertModal from "./AlertModal";
import { useNavigate } from "react-router";

function ListadoPublicaciones() {
  const [rows, setRows] = useState([]);

  const navigate = useNavigate();

  const [openModalAlert, setOpenModalAlert] = useState(false);
  const handleOpenModalAlert = () => setOpenModalAlert(true);
  const handleCloseModalAlert = () => setOpenModalAlert(false);
  const [msgModalAlert, setMsgModalAlert] = useState("");

  useEffect(() => {
    async function getPublicaciones() {
      let response = await fetch(apiUrl + "/publicacion");

      if (response.ok) {
        let data = await response.json();
        setRows(data.datos);
      }
    }

    getPublicaciones();
  }, []); // Se ejecuta solo en el primer renderizado
  // [] indica que este effect no depende de ningún valor de estado o props
  // Si se desea que se ejecute cada vez que un estado o prop cambia, debes eliminar el array vacío

  const handleDelete = async (idPublicacion) => {
    let response = await fetch(apiUrl + "/publicacion/" + idPublicacion, {
      method: "DELETE",
    });
    if (response.ok) {
      // Utilizando filter creo un array sin el plato borrado
      const filasTrasBorrado = rows.filter(
        (publicacion) => publicacion.id_publicacion != idPublicacion
      );
      // Establece los datos de nuevo para provocar un renderizado
      setRows(filasTrasBorrado);
      setMsgModalAlert("Publicacion eliminando correctamente");
      handleOpenModalAlert();
    } else {
      setMsgModalAlert("Error al eliminar la publicacion");
      handleOpenModalAlert();
    }
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          minHeight: "80vh",
          padding: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(255, 239, 170, 0.1)",
        }}
      >
        <Typography variant="h4" align="center" sx={{ m: 2 }}>
          Listado de publicaciones
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {rows.map((row) => (
            <Grid item key={row.id_publicacion}>
              <Card
                sx={{
                  mb: 2,
                  borderRadius: 3,
                  boxShadow: "0px 4px 10px rgba(212, 175, 55, 0.3)",
                  background: "linear-gradient(135deg, #fff 30%, #f9e6b3 100%)",
                  border: "1px solid #d4af37",
                }}
              >
                <CardContent>
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{
                      fontWeight: "bold",
                      color: "#b8860b",
                      mb: 1,
                    }}
                  >
                    {row.titulo}
                  </Typography>
                  <Typography sx={{ color: "#c9a347", mb: 1.5 }}>
                    {row.tema}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#333",
                      mb: 2,
                      lineHeight: 1.6,
                    }}
                  >
                    {row.texto}
                  </Typography>
                  <Typography sx={{ color: "#c9a347", fontSize: "0.875rem" }}>
                    {new Date(row.fecha_creacion).toLocaleString()}
                  </Typography>
                  <Typography sx={{ color: "#c9a347", fontSize: "0.875rem" }}>
                    {row.nombre_usuario ? row.nombre_usuario : "Anónimo"}
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    padding: "0 16px 16px",
                  }}
                >
                 <Button
                      variant="contained"
                      startIcon=<EditIcon />
                      onClick={() =>
                        navigate(`/modificarpublicacion/${row.id_publicacion}`)
                      }
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(row.id_publicacion)}
                      sx={{ ml: 2 }}
                      variant="contained"
                      color="error"
                      startIcon=<DeleteIcon />
                    >
                      Delete
                    </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <AlertModal
        open={openModalAlert}
        handleClose={handleCloseModalAlert}
        message={msgModalAlert}
      />
    </>
  );
}

export default ListadoPublicaciones;
