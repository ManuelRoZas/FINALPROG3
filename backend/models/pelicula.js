'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pelicula extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Pelicula.hasMany(models.UsuarioPeliculas, { foreignKey: 'peliculaId' });
    }
  }
  Pelicula.init({
    titulo: DataTypes.STRING,
    año: DataTypes.INTEGER,
    genero: DataTypes.STRING,
    director: DataTypes.STRING,
    portada: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pelicula',
  });
  return Pelicula;
};