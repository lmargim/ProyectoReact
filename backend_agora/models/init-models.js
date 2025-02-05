var DataTypes = require("sequelize").DataTypes;
var _comentario = require("./comentario");
var _publicacion = require("./publicacion");

function initModels(sequelize) {
  var comentario = _comentario(sequelize, DataTypes);
  var publicacion = _publicacion(sequelize, DataTypes);

  comentario.belongsTo(publicacion, { as: "id_publicacion_PUBLICACION", foreignKey: "id_publicacion"});
  publicacion.hasMany(comentario, { as: "COMENTARIOs", foreignKey: "id_publicacion"});

  return {
    comentario,
    publicacion,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
