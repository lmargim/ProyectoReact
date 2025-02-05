import { Typography, Box, Link } from "@mui/material";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";

function Footer() {
  return (
    <>
      <MDBFooter className="text-center text-lg-start bg-dark text-white">
        <MDBContainer className="p-4">
          <MDBRow>
            <MDBCol lg="9" md="12" sm="12" className="mb-4">
              <Typography variant="h6">Sobre el Blog</Typography>
              <Typography variant="body2">
                Un espacio donde compartimos conocimientos, ideas y experiencias
                sobre tecnología y desarrollo web.
              </Typography>
            </MDBCol>

            <MDBCol lg="3" md="12" sm="12" className="mb-4 text-lg-start text-center">
              <Typography variant="h6">Síguenos</Typography>
              <Link href="https://www.facebook.com" target="_blank" className="me-3 text-white">
                <MDBIcon fab icon="facebook-f" />
              </Link>
              <Link href="https://www.x.com" target="_blank" className="me-3 text-white">
                <MDBIcon fab icon="x" />
              </Link>
              <Link href="#https://www.instagram.com" target="_blank" className="me-3 text-white">
                <MDBIcon fab icon="instagram" />
              </Link>
              <Link href="https://www.linkedin.com" target="_blank" className="me-3 text-white">
                <MDBIcon fab icon="linkedin" />
              </Link>
            </MDBCol>
          </MDBRow>
        </MDBContainer>

        <Box className="text-center p-3 bg-secondary">
          <Typography variant="body2">
            © {new Date().getFullYear()} Ágora - Todos los derechos
            reservados.
          </Typography>
        </Box>
      </MDBFooter>
    </>
  );
}

export default Footer;
