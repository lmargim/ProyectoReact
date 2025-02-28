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
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";

/**
 * Estilos para el documento PDF.
 */
const styles = StyleSheet.create({
  page: { padding: 20 },
  title: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    marginBottom: 10,
  },
  tableRow: { flexDirection: "row" },
  tableColHeader: {
    width: "20%",
    borderStyle: "solid",
    borderWidth: 1,
    backgroundColor: "#ddd",
    padding: 5,
    fontWeight: "bold",
  },
  tableCol: { width: "20%", borderStyle: "solid", borderWidth: 1, padding: 5 },
});

/**
 * Componente `ListadoComentariosPDF`.
 * 
 * Este componente genera un documento PDF con el listado de comentarios.
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {Array} props.data - Datos de los comentarios a mostrar en el PDF.
 * @returns {JSX.Element} - Retorna un elemento JSX que representa el documento PDF.
 */
const ListadoComentariosPDF = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Listado de Comentarios</Text>
      <View style={styles.table}>
        {/* Encabezado de la tabla */}
        <View style={styles.tableRow}>
          <Text style={styles.tableColHeader}>ID COMENTARIO</Text>
          <Text style={styles.tableColHeader}>COMENTARIO</Text>
          <Text style={styles.tableColHeader}>FECHA CREACIÓN</Text>
          <Text style={styles.tableColHeader}>ID PUBLICACIÓN</Text>
          <Text style={styles.tableColHeader}>USUARIO</Text>
        </View>
        {/* Filas de datos */}
        {data.map((row) => (
          <View style={styles.tableRow} key={row.id_comentario}>
            <Text style={styles.tableCol}>{row.id_comentario}</Text>
            <Text style={styles.tableCol}>{row.texto}</Text>
            <Text style={styles.tableCol}>
              {new Date(row.fecha_creacion).toLocaleString()}
            </Text>
            <Text style={styles.tableCol}>{row.id_publicacion}</Text>
            <Text style={styles.tableCol}>
              {row.nombre_usuario || "Anónimo"}
            </Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

/**
 * Función para generar un PDF utilizando jsPDF y html2canvas.
 * Captura el contenido de la tabla y lo convierte en un archivo PDF.
 */
const generatePDF = () => {
  const input = document.getElementById("pdf-content");
  html2canvas(input).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 210; // Ancho de A4 en mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save("listado_comentarios.pdf");
  });
};

/**
 * Componente `ListadoComentarios`.
 * 
 * Este componente muestra un listado de comentarios en una tabla.
 * Permite eliminar comentarios, editar comentarios y exportar el listado en formato PDF.
 * 
 * @returns {JSX.Element} - Retorna un elemento JSX que representa el listado de comentarios.
 */
function ListadoComentarios() {
  const navigate = useNavigate(); // Hook para navegar entre rutas
  const [rows, setRows] = useState([]); // Estado para almacenar los comentarios
  const [openModalAlert, setOpenModalAlert] = useState(false); // Estado para controlar el modal de alerta
  const handleOpenModalAlert = () => setOpenModalAlert(true); // Función para abrir el modal de alerta
  const handleCloseModalAlert = () => setOpenModalAlert(false); // Función para cerrar el modal de alerta
  const [msgModalAlert, setMsgModalAlert] = useState(""); // Estado para almacenar el mensaje del modal de alerta

  // Efecto para cargar los comentarios al montar el componente
  useEffect(() => {
    async function getComentarios() {
      let response = await fetch(apiUrl + "/comentario");
      if (response.ok) {
        let data = await response.json();
        setRows(data.datos); // Actualiza el estado con los comentarios obtenidos
      }
    }
    getComentarios();
  }, []);

  /**
   * Maneja la eliminación de un comentario.
   * 
   * @param {number} idComentario - ID del comentario a eliminar.
   */
  const handleDelete = async (idComentario) => {
    let response = await fetch(apiUrl + "/comentario/" + idComentario, {
      method: "DELETE",
    });
    if (response.ok) {
      const filasTrasBorrado = rows.filter(
        (comentario) => comentario.id_comentario != idComentario
      );
      setRows(filasTrasBorrado); // Actualiza el estado eliminando el comentario
      setMsgModalAlert("Comentario eliminado correctamente");
      handleOpenModalAlert(); // Muestra el modal de alerta
    }
  };

  return (
    <>
      {/* Contenedor principal de la tabla */}
      <Box
        id="pdf-content"
        sx={{
          width: "100%",
          minHeight: "80vh",
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

        {/* Tabla de comentarios */}
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
                  key={row.id_comentario}
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
                  <TableCell>
                    {row.nombre_usuario ? row.nombre_usuario : "Anónimo"}
                  </TableCell>
                  <TableCell align="center">
                    {/* Botón para editar */}
                    <Button
                      variant="contained"
                      startIcon={<EditIcon />}
                      onClick={() =>
                        navigate(`/modificarcomentario/${row.id_comentario}`)
                      }
                    >
                      Edit
                    </Button>
                    {/* Botón para eliminar */}
                    <Button
                      onClick={() => handleDelete(row.id_comentario)}
                      sx={{ ml: 2 }}
                      variant="contained"
                      color="error"
                      startIcon={<DeleteIcon />}
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

      {/* Botones para exportar el listado */}
      <Box
        sx={{
          mx: 4,
          mt: 2,
          mb: 4,
          display: "flex",
          gap: 2,
        }}
      >
        {/* Botón para imprimir usando la función del navegador */}
        <Button variant="contained" onClick={() => window.print()} sx={{ flex: 1 }}>
          Imprimir listado (navegador)
        </Button>
        {/* Botón para generar PDF con jsPDF y html2canvas */}
        <Button variant="contained" onClick={generatePDF} sx={{ flex: 1 }}>
          Imprimir listado (jsPDF + html2canvas)
        </Button>
        {/* Botón para generar PDF con react-pdf */}
        <Button variant="contained" sx={{ flex: 1, color: "white" }}>
          <PDFDownloadLink
            document={<ListadoComentariosPDF data={rows} />}
            fileName="tabla.pdf"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            {({ loading }) =>
              loading ? "Generando PDF..." : "Imprimir listado (react-pdf)"
            }
          </PDFDownloadLink>
        </Button>
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

export default ListadoComentarios;