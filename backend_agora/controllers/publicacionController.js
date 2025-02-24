// publicacionController.js

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
const Publicacion = models.publicacion;

class PublicacionController {
  // ALTA PUBLICACION
  async altaPublicacion(req, res) {
    const publicacion = req.body;
    console.log("Datos recibidos en el servidor:", publicacion);

    try {
      // VALIDACION
      if (!publicacion.titulo || !publicacion.tema || !publicacion.texto) {
        throw new Error("Faltan datos obligatorios");
      }

      if (publicacion.titulo.length <= 0 || publicacion.titulo.length > 150) {
        throw new Error(
          "El título no puede estar vacío ni superar los 150 caracteres"
        );
      }

      if (publicacion.tema.length <= 0 || publicacion.tema.length > 20) {
        throw new Error(
          "El tema no puede estar vacío ni superar los 20 caracteres"
        );
      }

      if (publicacion.texto.length <= 0) {
        throw new Error("El texto no puede estar vacío");
      }

      console.log("Datos antes de insertar en la base de datos:", publicacion);
      
      // Crear la nueva publicación
      const publicacionCreada = await Publicacion.create(publicacion);

      // Respuesta de éxito usando la función exito
      res
        .status(201)
        .json(exito(publicacionCreada, "Publicación creada exitosamente"));
    } catch (err) {
      // Registrar el error en los logs
      logErrorSQL("Error en altaPublicacion: " + err.message);
      logMensaje("Error en altaPublicacion: " + err.message);

      // Respuesta de error usando la función error
      res
        .status(500)
        .json(error(null, `Error al insertar la publicación: ${err.message}`));
    }
  }

  // LISTADO PUBLICACION
  async getAllPublicacion(req, res) {
    try {
      const data = await Publicacion.findAll();
      res.json(exito(data, "Datos de platos recuperados"));
    } catch (err) {
      logErrorSQL("Error en getAllPublicacion: " + err.message);
      logMensaje("Error en getAllPublicacion: " + err.message);
      res
        .status(500)
        .json(
          error(
            null,
            `Error al recuperar los datos de las publicaciones: ${err.message}`
          )
        );
    }
  }

  // BORRAR PUBLICACION
  async deletePublicacion(req, res) {
    const id_publicacion = req.params.idpublicacion;
    try {
      const numFilas = await Publicacion.destroy({
        where: { id_publicacion: id_publicacion },
      });
      if (numFilas == 0) {
        // No se ha encontrado la publicacion
        res.status(404).json(error(null, "No se ha encontrado la publicacion"));
      } else {
        res.status(204).send();
      }
    } catch (err) {
      logErrorSQL("Error en deletePublicacion: " + err.message);
      logMensaje("Error en deletePublicacion: " + err.message);
      res
        .status(500)
        .json(
          error(
            null,
            `Error al eliminar la publicación con id ${id_publicacion}: ${err.message}`
          )
        );
    }
  }

  // OBTENER PUBLICACION POR ID
  async getPublicacionById(req, res) {
    const id_publicacion = req.params.idpublicacion;
    try {
      const fila = await Publicacion.findByPk(id_publicacion);
      console.log("Recibiendo ID:", req.params);
      if (fila) {
        res.json(exito(fila, "Publicación recuperada"));
      } else {
        res.status(404).json(error(null, "Publicación no encontrada"));
      }
    } catch (err) {
      logErrorSQL("Error en getPublicacionById: " + err.message);
      logMensaje("Error en getPublicacionById: " + err.message);
      res
        .status(500)
        .json(
          error(
            null,
            `Error al recuperar la publicación con id ${id_publicacion}: ${err.message}`
          )
        );
    }
  }

  // MODIFICAR PUBLICACION
  async updatePublicacion(req, res) {
    const id_publicacion = req.params.idpublicacion;
    const publicacion = req.body;
    console.log(id_publicacion);

    if (id_publicacion != publicacion.id_publicacion) {
      return res
        .status(400)
        .json(
          error(
            null,
            "El id de la publicación no coincide con el del cuerpo de la petición"
          )
        );
    }

    try {
      // VALIDACION
      if (!publicacion.titulo || !publicacion.tema || !publicacion.texto) {
        throw new Error("Faltan datos obligatorios");
      }

      if (publicacion.titulo.length <= 0 || publicacion.titulo.length > 150) {
        throw new Error(
          "El título no puede estar vacío ni superar los 150 caracteres"
        );
      }

      if (publicacion.tema.length <= 0 || publicacion.tema.length > 20) {
        throw new Error(
          "El tema no puede estar vacío ni superar los 20 caracteres"
        );
      }

      if (publicacion.texto.length <= 0) {
        throw new Error("El texto no puede estar vacío");
      }

      const publicacionExistente = await Publicacion.findByPk(id_publicacion);

      if (!publicacionExistente) {
        // Caso de "No encontrado"
        return res
          .status(404)
          .json(
            error(null, `Comentario con ID ${id_comentario} no encontrado`)
          );
      }

      const numFilas = await Publicacion.update(publicacion, {
        where: { id_publicacion },
      });

      res.json(exito(null, "Publicación modificada exitosamente"));

    } catch (err) {
      logErrorSQL("Error en updatePublicacion: " + err.message);
      logMensaje("Error en updatePublicacion: " + err.message);
      res
        .status(500)
        .json(
          error(
            null,
            `Error al modificar el comentario con id ${id_publicacion}: ${err.message}`
          )
        );
    }
  }

  async getPublicacionByTema(req, res) {
    const tema = req.params.tema;
    try {
      const data = await Publicacion.findAll({ where: { tema } });
      res.json(exito(data, "Publicaciones recuperadas"));
    } catch (err) {
      logErrorSQL("Error en getPublicacionByTema: " + err.message);
      logMensaje("Error en getPublicacionByTema: " + err.message);
      res
       .status(500)
       .json(
          error(
            null,
            `Error al recuperar los datos de las publicaciones por tema: ${err.message}`
          )
        );
    }
  }

}

module.exports = new PublicacionController();
