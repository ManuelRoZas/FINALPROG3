const db = require('../models');
const Pelicula = db.Pelicula;
const { Op } = require('sequelize');

exports.obtenerPeliculas = async (req, res) => {
  try {
    const { genero } = req.query;
    const filtro = genero ? { genero: { [Op.iLike]: `%${genero}%` } } : {};
    const peliculas = await Pelicula.findAll({ where: filtro });
    res.status(200).json(peliculas);
  } catch (error) {
    console.error('Error al obtener las películas:', error);
    res.status(500).json({ error: 'Error al obtener las películas' });
  }
};

exports.obtenerPeliculaPorId = async (req, res) => {
  try {
    const pelicula = await Pelicula.findByPk(req.params.id);
    if (!pelicula) return res.status(404).json({ error: 'Película no encontrada' });
    res.status(200).json(pelicula);
  } catch (error) {
    console.error('Error al obtener la película:', error);
    res.status(500).json({ error: 'Error al obtener la película' });
  }
};

exports.crearPelicula = async (req, res) => {
  try {
    const { titulo, año, genero, director, portada } = req.body;
    const nueva = await Pelicula.create({ titulo, año, genero, director, portada });
    res.status(201).json(nueva);
  } catch (error) {
    console.error('Error al crear la película:', error);
    res.status(500).json({ error: 'Error al crear la película' });
  }
};

exports.actualizarPelicula = async (req, res) => {
  try {
    const { titulo, año, genero, director, portada } = req.body;
    const [updated] = await Pelicula.update(
      { titulo, año, genero, director, portada },
      { where: { id: req.params.id } }
    );
    if (!updated) return res.status(404).json({ error: 'Película no encontrada' });
    res.status(200).json({ mensaje: 'Película actualizada con éxito' });
  } catch (error) {
    console.error('Error al actualizar la película:', error);
    res.status(500).json({ error: 'Error al actualizar la película' });
  }
};

exports.eliminarPelicula = async (req, res) => {
  try {
    const deleted = await Pelicula.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: 'Película no encontrada' });
    res.status(204).send();
  } catch (error) {
    console.error('Error al eliminar la película:', error);
    res.status(500).json({ error: 'Error al eliminar la película' });
  }
};

exports.obtenerGeneros = async (req, res) => {
  try {
    const generos = await Pelicula.findAll({
      attributes: ['genero'],
      group: ['genero'],
      raw: true // 👈 esto ayuda a que no venga como objeto Sequelize
    });

    const generosUnicos = generos.map(g => g.genero);
    res.status(200).json(generosUnicos);
  } catch (error) {
    console.error('Error al obtener los géneros:', error);
    res.status(500).json({ error: 'Error al obtener los géneros' });
  }
};

exports.obtenerPeliculasPorGenero = async (req, res) => {
  try {
    const { genero } = req.params;
    const peliculas = await Pelicula.findAll({ where: { genero } });
    res.status(200).json(peliculas);
  } catch (error) {
    console.error('Error al obtener las películas por género:', error);
    res.status(500).json({ error: 'Error al obtener las películas por género' });
  }
};


