import html2canvas from "html2canvas";
import jsPDF from "jspdf";

/**
 * Genera un archivo PDF a partir del contenido de un elemento HTML con el ID "pdf-content".
 * 
 * La función captura el contenido del elemento en un canvas utilizando html2canvas,
 * convierte la imagen generada a formato PNG y la inserta en un documento PDF con jsPDF.
 * Finalmente, guarda el archivo como "documento.pdf".
 */
const generatePDF = () => {
  // Obtiene el elemento HTML que se desea capturar
  const input = document.getElementById("pdf-content");
  
  if (!input) {
    console.error("Elemento con ID 'pdf-content' no encontrado.");
    return;
  }
  
  // Captura el contenido del elemento en un canvas con una escala de 2 para mayor calidad
  html2canvas(input, { scale: 2 }).then((canvas) => {
    // Convierte el canvas a una imagen en formato PNG
    const imgData = canvas.toDataURL("image/png");
    
    // Crea un nuevo documento PDF en formato A4 (210mm de ancho)
    const pdf = new jsPDF("p", "mm", "a4");
    
    // Calcula la altura proporcional de la imagen manteniendo su relación de aspecto
    const imgWidth = 210; // Ancho en mm del formato A4
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    // Agrega la imagen capturada al PDF
    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    
    // Guarda el PDF con el nombre "documento.pdf"
    pdf.save("documento.pdf");
  }).catch(error => {
    console.error("Error al generar el PDF:", error);
  });
};

export default generatePDF;
