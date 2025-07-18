const express = require('express');
const router = express.Router();

const peliculasRouter = require('./peliculas');
const usuariosRouter = require('./usuarios');
const usuarioPeliculasRouter = require('./usuarioPeliculas');

router.use('/peliculas', peliculasRouter);
router.use('/usuarios', usuariosRouter);
router.use('/usuarioPeliculas', usuarioPeliculasRouter);

// Ruta de prueba
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'API funcionando correctamente',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Ruta de ejemplo
router.get('/test', (req, res) => {
  res.json({
    message: 'Endpoint de prueba',
    data: {
      backend: 'Express',
      database: 'PostgreSQL',
      orm: 'Sequelize'
    }
  });
});

module.exports = router;
