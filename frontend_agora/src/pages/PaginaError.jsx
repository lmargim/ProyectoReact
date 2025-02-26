import Menu from "../components/Menu"; // Importa el componente Menu
import { Box, Button, Typography } from "@mui/material"; // Importa componentes de Material-UI

/**
 * Componente `PaginaError`.
 * 
 * Este componente representa una página de error 404, que se muestra cuando no se encuentra la ruta solicitada.
 * Incluye un mensaje de error y un botón para redirigir al usuario a la página principal.
 * 
 * @returns {JSX.Element} - Retorna un elemento JSX que representa la página de error.
 */
function PaginaError() {
  return (
    <>
      {/* Menú de navegación */}
      <Menu />

      {/* Mensaje de error */}
      <Typography variant="h4" align="center" sx={{ mt: 2 }}>
        No hemos encontrado la página que buscas
      </Typography>

      {/* Botón para redirigir a la página principal */}
      <Box textAlign={"center"} sx={{ mt: 2 }}>
        <Button variant="contained" align="center" href="/" sx={{ mt: 2 }}>
          Ir a la página principal
        </Button>
      </Box>
    </>
  );
}

export default PaginaError;