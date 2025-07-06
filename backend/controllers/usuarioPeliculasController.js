const { UsuarioPeliculas, Pelicula } = require('../models');

async function marcarEstado(req, res) {
  const { usuarioId, peliculaId, campo, valor } = req.body;

  console.log("BODY:", req.body);

  if (!['guardado', 'meGusta', 'vista'].includes(campo)) {
    return res.status(400).json({ error: 'Campo inválido' });
  }

  try {
    const [registro, creado] = await UsuarioPeliculas.findOrCreate({
      where: { usuarioId, peliculaId },
      defaults: {
        guardado: campo === 'guardado' ? valor : false,
        meGusta: campo === 'meGusta' ? valor : false,
       vista: campo === 'vista' ? valor : false
      }
    });

    if (!creado) {
      registro[campo] = valor;
      await registro.save();
    }

    res.json(registro);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function obtenerPeliculasPorEstado(req, res) {
  const { usuarioId, campo } = req.params;

  if (!['guardado', 'meGusta', 'vista'].includes(campo)) {
    return res.status(400).json({ error: 'Campo inválido' });
  }

  try {
    // Primero buscamos los registros en UsuarioPeliculas que cumplen con usuarioId y campo=true
    const registros = await UsuarioPeliculas.findAll({
      where: {
        usuarioId,
        [campo]: true
      },
      include: [{
        model: Pelicula,
      }]
    });

    // Construimos un array con las películas y la reseña directamente
    const peliculas = registros.map(registro => ({
      ...registro.Pelicula.toJSON(),
      resena: registro.resena || ''
    }));

    res.json(peliculas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function obtenerEstadoUsuarioPelicula(req, res) {
  const { usuarioId, peliculaId } = req.query;

  if (!usuarioId || !peliculaId) {
    return res.status(400).json({ error: 'Faltan usuarioId o peliculaId' });
  }

  try {
    const registro = await UsuarioPeliculas.findOne({
      where: { usuarioId, peliculaId }
    });

    if (!registro) {
      return res.json({ guardado: false, vista: false, meGusta: false });
    }

    res.json({
      guardado: registro.guardado,
      vista: registro.vista,
      meGusta: registro.meGusta
    });
  } catch (error) {
    console.error('Error en obtenerEstadoUsuarioPelicula:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

module.exports = {
  marcarEstado,
  obtenerPeliculasPorEstado,
  obtenerEstadoUsuarioPelicula
};
