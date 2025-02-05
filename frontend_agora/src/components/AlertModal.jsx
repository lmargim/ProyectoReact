import { Modal, Box, Typography, Button } from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";

const AlertModal = ({ message, open, handleClose }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
          padding: "24px",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.3s ease-in-out",
        }}
      >
        {/* Icono de advertencia */}
        <WarningIcon sx={{ fontSize: 40, color: "#f44336", mb: 2 }} />
        
        {/* Mensaje de la alerta */}
        <Typography
          id="modal-modal-description"
          sx={{
            m: 2,
          }}
        >
          {message}
        </Typography>

        {/* Botón de cerrar */}
        <Button
          onClick={handleClose}
          variant="text"
          sx={{mt:2}}
        >
          Aceptar
        </Button>
      </Box>
    </Modal>
  );
};

export default AlertModal;
