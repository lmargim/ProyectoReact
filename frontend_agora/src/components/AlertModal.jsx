import { Modal, Box, Typography, Button } from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";

/**
 * Componente `AlertModal`.
 * 
 * Este componente muestra un modal de alerta con un mensaje personalizado y un botón para cerrarlo.
 * Utiliza componentes de Material-UI para su estructura y estilos.
 * 
 * @param {Object} props - Las propiedades del componente.
 * @param {string} props.message - El mensaje que se mostrará en el modal.
 * @param {boolean} props.open - Controla si el modal está abierto o cerrado.
 * @param {Function} props.handleClose - Función que se ejecuta al cerrar el modal.
 * @returns {JSX.Element} - Retorna un elemento JSX que representa el modal de alerta.
 */
const AlertModal = ({ message, open, handleClose }) => {
  return (
    <Modal
      open={open} // Controla la visibilidad del modal
      onClose={handleClose} // Función que se ejecuta al cerrar el modal
      aria-labelledby="modal-modal-title" // Accesibilidad: etiqueta para el título del modal
      aria-describedby="modal-modal-description" // Accesibilidad: descripción del modal
    >
      {/* Contenedor principal del modal */}
      <Box
        sx={{
          position: "absolute", // Posición absoluta para centrar el modal
          top: "50%", // Centrado vertical
          left: "50%", // Centrado horizontal
          transform: "translate(-50%, -50%)", // Ajuste fino para centrar
          width: 400, // Ancho fijo del modal
          backgroundColor: "#ffffff", // Fondo blanco
          borderRadius: "12px", // Bordes redondeados
          boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)", // Sombra para efecto de elevación
          padding: "24px", // Espaciado interno
          textAlign: "center", // Alineación del texto al centro
          display: "flex", // Flexbox para alinear elementos
          flexDirection: "column", // Dirección de los elementos en columna
          alignItems: "center", // Centrado horizontal de los elementos
          justifyContent: "center", // Centrado vertical de los elementos
          transition: "all 0.3s ease-in-out", // Transición suave para animaciones
        }}
      >
        {/* Icono de advertencia */}
        <WarningIcon sx={{ fontSize: 40, color: "#f44336", mb: 2 }} />

        {/* Mensaje de la alerta */}
        <Typography
          id="modal-modal-description" // ID para accesibilidad
          sx={{
            m: 2, // Margen alrededor del texto
          }}
        >
          {message} {/* Muestra el mensaje pasado como prop */}
        </Typography>

        {/* Botón de cerrar */}
        <Button
          onClick={handleClose} // Función que se ejecuta al hacer clic en el botón
          variant="text" // Estilo de botón sin fondo
          sx={{ mt: 2 }} // Margen superior
        >
          Aceptar
        </Button>
      </Box>
    </Modal>
  );
};

export default AlertModal;