const express = require('express');
const router = express.Router();
const { marcarEstado, obtenerPeliculasPorEstado,obtenerEstadoUsuarioPelicula } = require('../controllers/usuarioPeliculasController');
const { obtenerResena, guardarResena } = require('../controllers/UsuariosController');


router.post('/marcar-estado', marcarEstado);
router.get('/peliculas/:usuarioId/:campo', obtenerPeliculasPorEstado);
router.get('/estado', obtenerEstadoUsuarioPelicula);
router.get('/resena', obtenerResena)
router.post('/guardar-resena', guardarResena)


module.exports = router;