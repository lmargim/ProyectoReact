const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('publicacion', {
    id_publicacion: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    titulo: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: "titulo"
    },
    texto: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    fecha_creacion: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    nombre_usuario: {
      type: DataTypes.STRING(15),
      allowNull: true,
      comment: "puede ser nulo (anonimo)"
    },
    tema: {
      type: DataTypes.STRING(20),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'PUBLICACION',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_publicacion" },
        ]
      },
      {
        name: "titulo",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "titulo" },
        ]
      },
    ]
  });
};
