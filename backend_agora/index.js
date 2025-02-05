// Importar librería express --> web server
const express = require("express");
// Importar librería path, para manejar rutas de ficheros en el servidor
const path = require("path");
// Importar libreria CORS
const cors = require("cors");
// Importar gestores de rutas
const publicacionRoutes = require("./routes/publicacionRoutes");
const comentarioRoutes = require("./routes/comentarioRoutes");

const app = express();
const port = process.env.PORT || 3000;

// Configurar middleware para analizar JSON en las solicitudes
app.use(express.json());
// Configurar CORS para admitir cualquier origen
app.use(cors());

// Configurar rutas de la API Rest
app.use("/api/publicacion", publicacionRoutes);
app.use("/api/comentario", comentarioRoutes);

// Verificar que las rutas se están registrando
console.log("Rutas activas:");
console.log("GET /api/publicacion");
console.log("GET /api/comentario");
// // Configurar el middleware para servir archivos estáticos desde el directorio 'public\old_js_vainilla'
// app.use(express.static(path.join(__dirname, "public","old_js_vainilla")));

// // Ruta para manejar las solicitudes al archivo index.html
// // app.get('/', (req, res) => {
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "old_js_vainilla","index.html"));
// });

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
