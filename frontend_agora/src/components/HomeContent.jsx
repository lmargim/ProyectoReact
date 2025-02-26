import {
  MDBCarousel,
  MDBCarouselItem,
  MDBCarouselCaption,
} from "mdb-react-ui-kit";

// Imagenes para el carousel
import img1 from "../assets/img1_agora_grecia.jpg";

/**
 * Componente que representa el contenido del Home Page.
 * Incluye un carrusel con imágenes y descripciones.
 * @returns {JSX.Element} El componente HomeContent.
 */
function HomeContent() {
  return (
    <>
      <MDBCarousel showIndicators showControls fade>
        <MDBCarouselItem itemId={1}>
          <img
            src={img1}
            alt="img1"
            style={{
              objectFit: "cover",
              width: "100%",
              height: "80vh", // Ajusta la altura para limitar el tamaño
            }}
          />
          <MDBCarouselCaption
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              borderRadius: "5px",
              color: "#ffffff",
              padding: "5px",
              textAlign: "center",
              maxHeight: "150px",
              overflow: "hidden", // Oculta el texto que excede
            }}
          >
            <h5 style={{ fontWeight: "bold" }}>
              Bienvenidos a Ágora: Tu espacio para compartir ideas
            </h5>
            <p style={{ fontSize: "1.1rem", fontWeight: "300" }}>
              En Ágora, nuestro objetivo es crear un espacio donde puedas
              compartir tus pensamientos, conocimientos y experiencias.
            </p>
          </MDBCarouselCaption>
        </MDBCarouselItem>
        <MDBCarouselItem itemId={2}>
          <img
            src={img1}
            alt="img1"
            style={{
              objectFit: "cover",
              width: "100%",
              height: "80vh", // Ajusta la altura para limitar el tamaño
            }}
          />
          <MDBCarouselCaption
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              borderRadius: "5px",
              color: "#ffffff",
              padding: "5px", // Menos espacio alrededor
              textAlign: "center",
              maxHeight: "150px", // Altura máxima del caption
              overflow: "hidden", // Oculta el texto que excede
            }}
          >
            <h5 style={{ fontWeight: "bold" }}>
              Comparte Ideas y Perspectivas en Diversos Temas
            </h5>
            <p style={{ fontSize: "1.1rem", fontWeight: "300" }}>
              Este es el lugar ideal para debatir sobre una variedad de temas,
              desde filosofía y cultura hasta política y entretenimiento. Únete
              a una comunidad de personas con opiniones diversas y participa en
              conversaciones que exploran diferentes puntos de vista. ¡Un
              espacio para discutir, aprender y expandir tus horizontes!
            </p>
          </MDBCarouselCaption>
        </MDBCarouselItem>
        <MDBCarouselItem itemId={3}>
          <img
            src={img1}
            alt="img1"
            style={{
              objectFit: "cover",
              width: "100%",
              height: "80vh", // Ajusta la altura para limitar el tamaño
            }}
          />
          <MDBCarouselCaption
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              borderRadius: "5px",
              color: "#ffffff",
              padding: "5px", // Menos espacio alrededor
              textAlign: "center",
              maxHeight: "150px", // Altura máxima del caption
              overflow: "hidden", // Oculta el texto que excede
            }}
          >
            <h5 style={{ fontWeight: "bold" }}>
              Comparte tu Opinión sobre las Publicaciones de Otros
            </h5>
            <p style={{ fontSize: "1.1rem", fontWeight: "300" }}>
              Exprésate y contribuye a la conversación dejando tus comentarios
              sobre las publicaciones de la comunidad. Tu opinión es valiosa y
              enriquece el debate. ¡No dudes en compartir tus pensamientos,
              hacer preguntas y generar nuevas ideas a partir de lo que otros
              comparten!
            </p>
          </MDBCarouselCaption>
        </MDBCarouselItem>
      </MDBCarousel>
    </>
  );
}

export default HomeContent;
