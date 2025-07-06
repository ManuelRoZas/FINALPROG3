import { useState, useEffect } from 'react';

function UsuariosPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

  const [guardadas, setGuardadas] = useState([]);
  const [vistas, setVistas] = useState([]);
  const [meGusta, setMeGusta] = useState([]);
  const [loading, setLoading] = useState(false);

  // Traer lista de usuarios al cargar
  useEffect(() => {
    fetch('/api/usuarios')
      .then(res => res.json())
      .then(data => setUsuarios(data))
      .catch(console.error);
  }, []);

  // Cuando cambia el usuario seleccionado, traigo sus listas
  useEffect(() => {
    if (!usuarioSeleccionado) return;

    async function fetchListas() {
      setLoading(true);
      try {
        const [resGuardadas, resVistas, resMeGusta] = await Promise.all([
          fetch(`/api/usuarioPeliculas/peliculas/${usuarioSeleccionado.id}/guardado`),
          fetch(`/api/usuarioPeliculas/peliculas/${usuarioSeleccionado.id}/vista`),
          fetch(`/api/usuarioPeliculas/peliculas/${usuarioSeleccionado.id}/meGusta`),
        ]);

        if (!resGuardadas.ok || !resVistas.ok || !resMeGusta.ok) {
          throw new Error('Error al cargar datos');
        }

        const dataGuardadas = await resGuardadas.json();
        const dataVistas = await resVistas.json();
        const dataMeGusta = await resMeGusta.json();

        setGuardadas(dataGuardadas);
        setVistas(dataVistas);
        setMeGusta(dataMeGusta);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchListas();
  }, [usuarioSeleccionado]);

  // Combinar todas las películas y filtrar las que tienen reseña
  const todasLasPeliculas = [...guardadas, ...vistas, ...meGusta];
  // Para evitar duplicados (por si una peli está en más de una lista)
  const peliculasConResenaMap = new Map();
  todasLasPeliculas.forEach(peli => {
    if (peli.resena && peli.resena.trim() !== '') {
      peliculasConResenaMap.set(peli.id, peli);
    }
  });
  const peliculasConResena = Array.from(peliculasConResenaMap.values());

  return (
    <div style={{ padding: 20 }}>
      <h1>Usuarios</h1>

      <select
        onChange={e => {
          const id = e.target.value;
          const user = usuarios.find(u => u.id === Number(id));
          setUsuarioSeleccionado(user || null);
          setGuardadas([]);
          setVistas([]);
          setMeGusta([]);
        }}
        value={usuarioSeleccionado?.id || ''}
      >
        <option value="">-- Seleccioná un usuario --</option>
        {usuarios.map(u => (
          <option key={u.id} value={u.id}>{u.nombre}</option>
        ))}
      </select>

      {!usuarioSeleccionado && <p>Seleccioná un usuario para ver sus listas.</p>}

      {loading && <p>Cargando listas del usuario...</p>}

      {usuarioSeleccionado && !loading && (
        <>
          <h2>Películas Guardadas</h2>
          {guardadas.length === 0 ? (
            <p>No hay películas guardadas.</p>
          ) : (
            <ul>
              {guardadas.map(peli => (
                <li key={peli.id}>
                  {peli.titulo}
                  <img
                    src={peli.portada}
                    alt={`Portada de ${peli.titulo}`}
                    style={{ width: 50, height: 75, objectFit: 'cover', borderRadius: 4 }}
                  />
                </li>
              ))}
            </ul>
          )}

          <h2>Películas Vistas</h2>
          {vistas.length === 0 ? (
            <p>No hay películas vistas.</p>
          ) : (
            <ul>
              {vistas.map(peli => (
                <li key={peli.id}>
                  {peli.titulo}
                  <img
                    src={peli.portada}
                    alt={`Portada de ${peli.titulo}`}
                    style={{ width: 50, height: 75, objectFit: 'cover', borderRadius: 4 }}
                  />
                </li>
              ))}
            </ul>
          )}

          <h2>Películas con Me Gusta</h2>
          {meGusta.length === 0 ? (
            <p>No hay películas con me gusta.</p>
          ) : (
            <ul>
              {meGusta.map(peli => (
                <li key={peli.id}>
                  {peli.titulo}
                    <img
                    src={peli.portada}
                    alt={`Portada de ${peli.titulo}`}
                    style={{ width: 50, height: 75, objectFit: 'cover', borderRadius: 4 }}
                  />
                </li>
              ))}
            </ul>
          )}

          <h2>Reseñas hechas</h2>
          {peliculasConResena.length === 0 ? (
            <p>El usuario no ha escrito reseñas.</p>
          ) : (
            <ul>
              {peliculasConResena.map(peli => (
                <li key={peli.id}>
                  
                  <strong>{peli.titulo}:</strong> {peli.resena}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}

export default UsuariosPage;
