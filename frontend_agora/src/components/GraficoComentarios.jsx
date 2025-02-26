import { Box, Typography, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { apiUrl } from "../config";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

/**
 * Componente que muestra un gráfico de barras con los comentarios por usuario.
 * @returns {JSX.Element} El componente GraficoComentarios.
 */
function GraficoComentarios() {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    async function getDatosGraficaComentarios() {
      try {
        let response = await fetch(apiUrl + "/comentario/grafica", {
          method: "GET",
        });

        if (response.ok) {
          let data = await response.json();
          let datosGrafica = data.datos.map((fila) => ({
            nombre_usuario: fila.nombre_usuario ? fila.nombre_usuario : "Anónimos",
            numComentarios: parseInt(fila.numComentarios, 10),
          }));
          setDatos(datosGrafica);
          console.log("Datos gráfica cargados:", datosGrafica);
        } else {
          console.error("Error al obtener los datos:", response.status);
        }
      } catch (error) {
        console.error("Error en la petición:", error);
      }
    }
    getDatosGraficaComentarios();
  }, []);

  /**
   * Función para exportar la gráfica a PDF.
   */
  const exportToPDF = () => {
    const input = document.getElementById("grafica-comentarios");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("landscape"); // Orientación horizontal
      const imgWidth = 280; // Ancho de la imagen en el PDF
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      pdf.save("grafica_comentarios.pdf");
    });
  };

  return (
    <Box
      sx={{
        padding: 2,
        backgroundColor: "rgba(255, 239, 170, 0.1)",
        minHeight: "80vh",
      }}
    >
      <Typography variant="h4" align="center" sx={{ m: 2, mb: 4 }}>
        Comentarios por usuario
      </Typography>
      {datos.length > 0 ? (
        <>
          <Box id="grafica-comentarios">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={datos}
                margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
              >
                <CartesianGrid strokeDasharray="3 3" /> {/* Grid */}
                <XAxis dataKey="nombre_usuario" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip /> {/* Tooltip */}
                <Legend /> {/* Leyenda */}
                <Bar dataKey="numComentarios" fill="#ff9800" barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Button variant="contained" onClick={exportToPDF}>
              Exportar a PDF
            </Button>
          </Box>
        </>
      ) : (
        <Typography variant="body1" sx={{ textAlign: "center", marginTop: 4 }}>
          No hay datos disponibles.
        </Typography>
      )}
    </Box>
  );
}

export default GraficoComentarios;