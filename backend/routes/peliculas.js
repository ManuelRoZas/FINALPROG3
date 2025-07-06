const express = require('express');
const router = express.Router();
const PeliculasController = require('../controllers/PeliculasController');

router.get('/', PeliculasController.obtenerPeliculas);
router.get('/:id', PeliculasController.obtenerPeliculaPorId);
router.post('/', PeliculasController.crearPelicula);
router.put('/:id', PeliculasController.actualizarPelicula);
router.delete('/:id', PeliculasController.eliminarPelicula);

module.exports = router;