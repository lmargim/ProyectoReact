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

// Estilos del PDF
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

// Componente del documento PDF para comentarios
const ListadoComentariosPDF = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Listado de Comentarios</Text>
      <View style={styles.table}>
        {/* Encabezado */}
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

// Función para generar PDF con jsPDF y html2canvas
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
  }, []);

  const handleDelete = async (idComentario) => {
    let response = await fetch(apiUrl + "/comentario/" + idComentario, {
      method: "DELETE",
    });
    if (response.ok) {
      const filasTrasBorrado = rows.filter(
        (comentario) => comentario.id_comentario != idComentario
      );
      setRows(filasTrasBorrado);
      setMsgModalAlert("Comentario eliminado correctamente");
      handleOpenModalAlert();
    }
  };

  return (
    <>
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
                    <Button
                      variant="contained"
                      startIcon={<EditIcon />}
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
      <Box
  sx={{
    mx: 4,
    mt: 2,
    mb: 4,
    display: "flex",
    gap: 2,
  }}
>
  <Button
    variant="contained"
    onClick={() => window.print()}
    sx={{ flex: 1 }}
  >
    Imprimir listado (navegador)
  </Button>
  <Button
    variant="contained"
    onClick={generatePDF}
    sx={{ flex: 1 }}
  >
    Imprimir listado (jsPDF + html2canvas)
  </Button>
  <Button
    variant="contained"
    sx={{
      flex: 1,
      color: "white", 
    }}
  >
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
      <AlertModal
        open={openModalAlert}
        handleClose={handleCloseModalAlert}
        message={msgModalAlert}
      />
    </>
  );
}

export default ListadoComentarios;
