const express = require('express');
const router = express.Router();
const UsuariosController = require('../controllers/UsuariosController');

router.get('/', UsuariosController.obtenerUsuarios);
router.get('/:id', UsuariosController.obtenerUsuarioPorId);
router.post('/', UsuariosController.crearUsuario);
router.put('/:id', UsuariosController.actualizarUsuario);
router.delete('/:id', UsuariosController.eliminarUsuario);

module.exports = router;