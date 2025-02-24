//importar libreria para manejo de configuracion
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});
// Importar fichero de configuración con variables de entorno
const config = require("./config/config");
// Importar librería express --> web server
const express = require("express");
// Importar librería path, para manejar rutas de ficheros en el servidor
const path = require("path");
// Importar libreria CORS
const cors = require("cors");
// Importar gestores de rutas
const publicacionRoutes = require("./routes/publicacionRoutes");
const comentarioRoutes = require("./routes/comentarioRoutes");

const app = express();
// const port = process.env.PORT || 3000;

// Configurar CORS para admitir solicitudes desde http://localhost:5173
app.use(cors());

// Configurar rutas de la API Rest
app.use("/api/publicacion", publicacionRoutes);
app.use("/api/comentario", comentarioRoutes);


// Configurar middleware para analizar JSON en las solicitudes
app.use(express.json());


// Verificar que las rutas se están registrando
console.log("Rutas activas:");
console.log("GET /api/publicacion");
console.log("GET /api/comentario");

// Configurar el middleware para servir archivos estáticos desde el directorio 'public\old_js_vainilla'
app.use(express.static(path.join(__dirname, "public")));

// Ruta para manejar las solicitudes al archivo index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Iniciar el servidor solo si no estamos en modo de prueba
if (process.env.NODE_ENV !== "test") {
  app.listen(config.port, () => {
    console.log(`Servidor escuchando en el puerto ${config.port}`);
  });
}
// Exportamos la aplicación para poder hacer pruebas
module.exports = app;
