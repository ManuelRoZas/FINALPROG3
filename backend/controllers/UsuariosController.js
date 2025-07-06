const db = require('../models');
const Usuario = db.Usuario;
const UsuarioPeliculas = db.UsuarioPeliculas;

const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    console.log('Usuarios obtenidos:', usuarios);
    res.status(200).json(usuarios);
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
};

const obtenerUsuarioPorId = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.status(200).json(usuario);
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
};

const crearUsuario = async (req, res) => {
  try {
    const { nombre } = req.body;
    const nuevoUsuario = await Usuario.create({ nombre });
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
};

const actualizarUsuario = async (req, res) => {
  try {
    const { nombre } = req.body;
    const [actualizado] = await Usuario.update({ nombre }, { where: { id: req.params.id } });
    if (!actualizado) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.status(200).json({ mensaje: 'Usuario actualizado con éxito' });
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
};

const eliminarUsuario = async (req, res) => {
  try {
    const eliminado = await Usuario.destroy({ where: { id: req.params.id } });
    if (!eliminado) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.status(204).send();
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
    res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
};

async function obtenerResena(req, res) {
  const { usuarioId, peliculaId } = req.query;

  if (!usuarioId || !peliculaId) {
    return res.status(400).json({ error: 'Faltan parámetros' });
  }

  try {
    const registro = await UsuarioPeliculas.findOne({
      where: { usuarioId, peliculaId }
    });

    res.json({ resena: registro ? registro.resena || '' : '' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function guardarResena(req, res) {
  const { usuarioId, peliculaId, resena } = req.body;

  if (!usuarioId || !peliculaId) {
    return res.status(400).json({ error: 'Faltan parámetros' });
  }

  try {
    const [registro, creado] = await UsuarioPeliculas.findOrCreate({
      where: { usuarioId, peliculaId },
      defaults: { resena }
    });

    if (!creado) {
      registro.resena = resena;
      await registro.save();
    }

    res.json({ mensaje: 'Reseña guardada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


module.exports = {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
  obtenerResena,
  guardarResena
};
