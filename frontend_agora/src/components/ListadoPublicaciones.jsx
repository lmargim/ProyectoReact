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

/**
 * Componente `ListadoPublicaciones`.
 * 
 * Este componente muestra un listado de publicaciones en formato de tarjetas.
 * Permite eliminar publicaciones, editar publicaciones y navegar a la página de modificación.
 * 
 * @returns {JSX.Element} - Retorna un elemento JSX que representa el listado de publicaciones.
 */
function ListadoPublicaciones() {
  const [rows, setRows] = useState([]); // Estado para almacenar las publicaciones
  const navigate = useNavigate(); // Hook para navegar entre rutas

  // Estados para controlar el modal de alerta
  const [openModalAlert, setOpenModalAlert] = useState(false);
  const handleOpenModalAlert = () => setOpenModalAlert(true);
  const handleCloseModalAlert = () => setOpenModalAlert(false);
  const [msgModalAlert, setMsgModalAlert] = useState("");

  // Efecto para cargar las publicaciones al montar el componente
  useEffect(() => {
    async function getPublicaciones() {
      let response = await fetch(apiUrl + "/publicacion");

      if (response.ok) {
        let data = await response.json();
        setRows(data.datos); // Actualiza el estado con las publicaciones obtenidas
      }
    }

    getPublicaciones();
  }, []); // Se ejecuta solo en el primer renderizado

  /**
   * Maneja la eliminación de una publicación.
   * 
   * @param {number} idPublicacion - ID de la publicación a eliminar.
   */
  const handleDelete = async (idPublicacion) => {
    let response = await fetch(apiUrl + "/publicacion/" + idPublicacion, {
      method: "DELETE",
    });
    if (response.ok) {
      // Filtra las publicaciones para eliminar la publicación con el ID especificado
      const filasTrasBorrado = rows.filter(
        (publicacion) => publicacion.id_publicacion != idPublicacion
      );
      setRows(filasTrasBorrado); // Actualiza el estado eliminando la publicación
      setMsgModalAlert("Publicación eliminada correctamente");
      handleOpenModalAlert(); // Muestra el modal de alerta
    } else {
      setMsgModalAlert("Error al eliminar la publicación");
      handleOpenModalAlert(); // Muestra el modal de alerta en caso de error
    }
  };

  return (
    <>
      {/* Contenedor principal del listado de publicaciones */}
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

        {/* Grid para mostrar las publicaciones en formato de tarjetas */}
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
                  {/* Título de la publicación */}
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

                  {/* Tema de la publicación */}
                  <Typography sx={{ color: "#c9a347", mb: 1.5 }}>
                    {row.tema}
                  </Typography>

                  {/* Texto de la publicación */}
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

                  {/* Fecha de creación de la publicación */}
                  <Typography sx={{ color: "#c9a347", fontSize: "0.875rem" }}>
                    {new Date(row.fecha_creacion).toLocaleString()}
                  </Typography>

                  {/* Nombre del autor o "Anónimo" */}
                  <Typography sx={{ color: "#c9a347", fontSize: "0.875rem" }}>
                    {row.nombre_usuario ? row.nombre_usuario : "Anónimo"}
                  </Typography>
                </CardContent>

                {/* Acciones de la tarjeta (editar y eliminar) */}
                <CardActions
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    padding: "0 16px 16px",
                  }}
                >
                  {/* Botón para editar la publicación */}
                  <Button
                    variant="contained"
                    startIcon={<EditIcon />}
                    onClick={() =>
                      navigate(`/modificarpublicacion/${row.id_publicacion}`)
                    }
                  >
                    Edit
                  </Button>

                  {/* Botón para eliminar la publicación */}
                  <Button
                    onClick={() => handleDelete(row.id_publicacion)}
                    sx={{ ml: 2 }}
                    variant="contained"
                    color="error"
                    startIcon={<DeleteIcon />}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
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

export default ListadoPublicaciones;