// comentarioController.js

// Importar libreria para respuestas
const { exito, error } = require("../utils/respuesta"); // Importar las funciones exito y error
const { logMensaje, logErrorSQL } = require("../utils/logger.js");
// Recuperar función de inicialización de modelos
const initModels = require("../models/init-models.js").initModels;
// Crear la instancia de sequelize con la conexión a la base de datos
const sequelize = require("../config/sequelize.js");

// Cargar las definiciones del modelo en sequelize
const models = initModels(sequelize);
// Recuperar el modelo publicacion
const Comentario = models.comentario;

class ComentarioController {
  // ALTA COMENTARIO
  async altaComentario(req, res) {
    const comentario = req.body;
    try {
      // VALIDACION
      if (!comentario.texto || !comentario.id_publicacion) {
        throw new Error("Faltan datos obligatorios");
      }

      if (comentario.texto.length <= 0 || comentario.texto.length > 300) {
        throw new Error(
          "El comentario no debe estar vacio ni superar los 300 caracteres"
        );
      }

      if (
        comentario.nombre_usuario < 0 &&
        comentario.nombre_usuario.length > 15
      ) {
        throw new Error(
          "El nombre del usuario no puede superar los 15 caracteres"
        );
      }

      // Crear el comentario
      const comentarioCreado = await Comentario.create(comentario);

      // Respuesta de éxito usando la funcion exito
      res
        .status(201)
        .json(exito(comentarioCreado, "Comentario creado exitosamente"));
    } catch (err) {
      // Registrar el error en los logs
      logErrorSQL("Error en altaComentario: " + err.message);
      logMensaje("Error en altaComentario: " + err.message);
      // Respuesta de error usando la función error
      res
        .status(500)
        .json(error(null, `Error al insertar el comentario: ${err.message}`));
    }
  }

  // LISTADO COMENTARIO
  async getAllComentario(req, res) {
    try {
      const data = await Comentario.findAll();
      res.json(exito(data, "Datos de comentarios recuperados"));
    } catch (err) {
      logErrorSQL("Error en getAllComentario: " + err.message);
      logMensaje("Error en getAllComentario: " + err.message);
      res
        .status(500)
        .json(
          error(
            null,
            `Error al recuperar los datos de los comentarios: ${err.message}`
          )
        );
    }
  }

  // BUSCAR COMENTARIO POR ID
  async getComentarioById(req, res) {
    const idcomentario = req.params.idcomentario;
    console.log("Recibiendo ID:", req.params);
    try {
      const fila = await Comentario.findByPk(idcomentario);
      if (fila) {
        res.json(exito(fila, "Comentario recuperado"));
      } else {
        res.status(404).json(error(null, "Comentario no encontrado"));
      }
    } catch (err) {
      logErrorSQL("Error en getComentarioById: " + err.message);
      logMensaje("Error en getComentarioById: " + err.message);
      res
        .status(500)
        .json(
          error(
            null,
            `Error al recuperar el comentario con id ${idcomentario}: ${err.message}`
          )
        );
    }
  }

  // MODIFICAR COMENTARIO
  async updateComentario(req, res) {
    const id_comentario = req.params.idcomentario;
    const comentario = req.body;

    if (id_comentario != comentario.id_comentario) {
      return res
        .status(400)
        .json(error(null, "El id del comentario no coincide"));
    }

    try {
      // VALIDACION
      if (!comentario.texto) {
        throw new Error("Faltan datos obligatorios");
      }

      if (comentario.texto.length <= 0 || comentario.texto.length > 300) {
        throw new Error(
          "El comentario no debe estar vacio ni superar los 300 caracteres"
        );
      }

      if (
        comentario.nombre_usuario < 0 &&
        comentario.nombre_usuario.length > 15
      ) {
        throw new Error(
          "El nombre del usuario no puede superar los 15 caracteres"
        );
      }

      const comentarioExistente = await Comentario.findByPk(id_comentario);

      if (!comentarioExistente) {
        // Caso de "No encontrado"
        return res
          .status(404)
          .json(
            error(null, `Comentario con ID ${id_comentario} no encontrado`)
          );
      }

      const numFilas = await Comentario.update(comentario, {
        where: { id_comentario },
      });

      res.json(exito(null, "Comentario modificado exitosamente"));
    } catch (err) {
      logErrorSQL("Error en updateComentario: " + err.message);
      logMensaje("Error en updateComentario: " + err.message);
      res
        .status(500)
        .json(
          error(
            null,
            `Error al modificar el comentario con id ${id_comentario}: ${err.message}`
          )
        );
    }
  }

  // BORRAR COMENTARIO
  async deleteComentario(req, res) {
    const id_comentario = req.params.idcomentario;
    try {
      const numFilas = await Comentario.destroy({
        where: {
          id_comentario: id_comentario,
        },
      });
      if (numFilas == 0) {
        // No se ha encontrado el comentario
        res.status(404).json(error(null, "Comentario no encontrado"));
      } else {
        // Al dar status 204 no se devuelve nada
        res.status(204).send();
      }
    } catch (err) {
      logErrorSQL("Error en deleteComentario: " + err.message);
      logMensaje("Error en deleteComentario: " + err.message);
      res
        .status(500)
        .json(
          error(
            null,
            `Error al eliminar el comentario con id ${id_comentario}: ${err.message}`
          )
        );
    }
  }

  // BUSCAR COMENTARIO POR AUTOR
  async getComentarioByAutor(req, res) {
    const nombre_usuario = req.params.nombre_usuario;

    try {
      let condicion = {};

      if (nombre_usuario === "anonimo" || nombre_usuario === "Anónimo" || nombre_usuario === "anónimo" || nombre_usuario === "ANONIMO" || nombre_usuario === "ANÓNIMO" || nombre_usuario === "Anonimo") {
        condicion = { nombre_usuario: "" };
      } else {
        condicion = { nombre_usuario };
      }

      const data = await Comentario.findAll({ where: condicion });

      if (data.length > 0) {
        res.json(exito(data, "Comentarios recuperados por autor"));
      } else {
        res.status(404).json(error(null, "Comentarios no encontrados"));
      }
    } catch (err) {
      logErrorSQL("Error en getComentarioByAutor: " + err.message);
      logMensaje("Error en getComentarioByAutor: " + err.message);
      res
        .status(500)
        .json(
          error(
            null,
            `Error al recuperar los comentarios del autor ${nombre_usuario}: ${err.message}`
          )
        );
    }
  }
}

module.exports = new ComentarioController();
