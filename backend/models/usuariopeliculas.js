'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UsuarioPeliculas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UsuarioPeliculas.belongsTo(models.Usuario, {
        foreignKey: 'usuarioId',
        onDelete: 'CASCADE',
      });
      UsuarioPeliculas.belongsTo(models.Pelicula, {
        foreignKey: 'peliculaId',
        onDelete: 'CASCADE',
      });
    }
  }
  UsuarioPeliculas.init({
    usuarioId: DataTypes.INTEGER,
    peliculaId: DataTypes.INTEGER,
    guardado: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: null
    },
    meGusta: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: null
    },
    vista: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: null
    },
    resena: {                  
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: null,
    }
  }, {
    sequelize,
    modelName: 'UsuarioPeliculas',
  });

  return UsuarioPeliculas;
};