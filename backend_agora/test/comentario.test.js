const request = require("supertest");
const app = require("../index");
const { sequelize } = require("../config/sequelize");

describe("📝 Pruebas sobre la API de comentarios", () => {
  let comentarioId;

  test("✅ POST /api/comentario → Crear un comentario", async () => {
    const res = await request(app).post("/api/comentario").send({
      texto: "Este es un comentario de prueba",
      id_publicacion: 1, // Asegúrate de que esta publicación existe
      nombre_usuario: "UsuarioTest",
    });
  
    expect(res.statusCode).toBe(201);
    expect(res.body.ok).toBe(true);
  
    // Guardamos el ID del comentario creado para futuras pruebas
    comentarioId = res.body.datos.id_comentario; 
  });

  test("✅ GET /api/comentario → Obtener todos los comentarios", async () => {
    const res = await request(app).get("/api/comentario");
    expect(res.statusCode).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(Array.isArray(res.body.datos)).toBe(true);
  });

  test("✅ GET /api/comentario/:id → Obtener un comentario por ID", async () => {
    console.log("Comentario ID en test:", comentarioId); // <-- Agrega esto
    const res = await request(app).get(`/api/comentario/id/${comentarioId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(res.body.datos.id_comentario).toBe(comentarioId);
  });
  
  test("✅ PUT /api/comentario/:id → Actualizar un comentario", async () => {
    const res = await request(app).put(`/api/comentario/${comentarioId}`).send({
      id_comentario: comentarioId,
      texto: "Comentario actualizado",
      id_publicacion: 1,
      nombre_usuario: "Luis",
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.ok).toBe(true);
  });

  test("✅ DELETE /api/comentario/:id → Eliminar un comentario", async () => {
    const res = await request(app).delete(`/api/comentario/${comentarioId}`);
    expect(res.statusCode).toBe(204);
  });

  test("✅ GET /api/comentario/:id → Buscar un comentario eliminado debe devolver 404", async () => {
    const res = await request(app).get(`/api/comentario/${comentarioId}`);
    expect(res.statusCode).toBe(404);
  });
});