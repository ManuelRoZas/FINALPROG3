import { useState, useEffect } from 'react';
import "../styles/ListasUsuario.css";

function UsuariosPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [guardadas, setGuardadas] = useState([]);
  const [vistas, setVistas] = useState([]);
  const [meGusta, setMeGusta] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/usuarios')
      .then(res => res.json())
      .then(data => setUsuarios(data))
      .catch(console.error);
  }, []);

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

  const todasLasPeliculas = [...guardadas, ...vistas, ...meGusta];
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

      <select className='select-usuario'
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

      <button className='agregar-usuario-btn' onClick={() => {
        const nombre = prompt('Ingrese el nombre del nuevo usuario:');
        if (nombre) {
          fetch('/api/usuarios', {
            method: 'POST',
            headers: {  'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre }),
          })
            .then(res => {
              if (!res.ok) {
                throw new Error('Error al crear el usuario');
              }
              return res.json();
            })
            .then(nuevoUsuario => {
              setUsuarios(prev => [...prev, nuevoUsuario]);
              setUsuarioSeleccionado(nuevoUsuario);
            })
            .catch(err => {
              console.error('Error al agregar usuario:', err);
            });
        }
      }}>Agregar Usuario</button>

      <button className='agregar-usuario-btn' onClick={() => {
        if (!usuarioSeleccionado) {
          alert('Seleccioná un usuario para eliminar.');
          return;
        }

        if (window.confirm(`¿Estás seguro de que deseas eliminar a ${usuarioSeleccionado.nombre}?`)) {
          fetch(`/api/usuarios/${usuarioSeleccionado.id}`, {
            method: 'DELETE',
          })
            .then(res => {
              if (!res.ok) {
                throw new Error('Error al eliminar el usuario');
              }
              return res.json();
            })
            .then(() => {
              setUsuarios(prev => prev.filter(u => u.id !== usuarioSeleccionado.id));
              setUsuarioSeleccionado(null);
            })
            .catch(err => {
              console.error('Error al eliminar usuario:', err);
            });
        }
      }}>Eliminar Usuario</button>

      {!usuarioSeleccionado && <p>Seleccioná un usuario para ver sus listas.</p>}

      {loading && <p>Cargando listas del usuario...</p>}

      {usuarioSeleccionado && !loading && (
        <>
          <h2>Películas Guardadas</h2>
          {guardadas.length === 0 ? (
            <p>No hay películas guardadas.</p>
          ) : (
            <div className="peliculas-grid">
              {guardadas.map(peli => (
                <div key={peli.id} className="pelicula-item">
                  {peli.titulo}
                  <img
                    src={peli.portada}
                    alt={`Portada de ${peli.titulo}`}
                  />
                </div>
              ))}
            </div>
          )}

          <h2>Películas Vistas</h2>
          {vistas.length === 0 ? (
            <p>No hay películas vistas.</p>
          ) : (
            <div className="peliculas-grid">
              {vistas.map(peli => (
                <div key={peli.id} className="pelicula-item">
                  {peli.titulo}
                  <img
                    src={peli.portada}
                    alt={`Portada de ${peli.titulo}`}
                  />
                </div>
              ))}
            </div>
          )}

          <h2>Películas con Me Gusta</h2>
          {meGusta.length === 0 ? (
            <p>No hay películas con me gusta.</p>
          ) : (
            <div className="peliculas-grid">
              {meGusta.map(peli => (
                <div key={peli.id} className="pelicula-item">
                  {peli.titulo}
                  <img
                    src={peli.portada}
                    alt={`Portada de ${peli.titulo}`}
                  />
                </div>
              ))}
            </div>
          )}

            <h2>Reseñas hechas</h2>
            {peliculasConResena.length === 0 ? (
              <p>El usuario no ha escrito reseñas.</p>
            ) : (
              <div className="peliculas-grid">
                {peliculasConResena.map(peli => (
                  <div key={peli.id} className="pelicula-item">
                    <img
                      src={peli.portada}
                      alt={`Portada de ${peli.titulo}`}
                    />
                    <h4>{peli.titulo}</h4>
                    <p className="resena-texto">{peli.resena}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    );
  }
export default UsuariosPage;
