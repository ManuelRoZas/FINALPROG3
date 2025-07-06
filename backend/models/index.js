// backend/models/index.js
const { Sequelize } = require('sequelize');
const config = require('../config/database');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    logging: dbConfig.logging,
    pool: dbConfig.pool,
    dialectOptions: dbConfig.dialectOptions
  }
);

const db = {};

// Carga modelos y los agrega al objeto db
db.Pelicula = require('./pelicula')(sequelize, Sequelize.DataTypes);
db.Usuario = require('./usuario')(sequelize, Sequelize.DataTypes);
db.UsuarioPeliculas = require('./usuariopeliculas')(sequelize, Sequelize.DataTypes);

// Asocia modelos
Object.values(db).forEach(model => {
  if (model.associate) {
    model.associate(db);
  }
});

// Exporta sequelize, Sequelize y los modelos
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
