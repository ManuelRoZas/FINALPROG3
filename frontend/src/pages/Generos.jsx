import { useState, useEffect } from 'react';
import '../styles/GeneroSelec.css';

function GenerosPage() {
  const [generos, setGeneros] = useState([]);
  const [generoSeleccionado, setGeneroSeleccionado] = useState('');
  const [peliculas, setPeliculas] = useState([]);

useEffect(() => {
  fetch('/api/peliculas/generos')
    .then(res => res.json())
    .then(data => {
      console.log('Respuesta de /generos:', data); 
      setGeneros(data);
    })
    .catch(err => {
      console.error('Error al obtener géneros:', err);
    });
}, []);
  useEffect(() => {
    if (!generoSeleccionado) return;

    fetch(`/api/peliculas/genero/${encodeURIComponent(generoSeleccionado)}`)
      .then(res => res.json())
      .then(data => setPeliculas(data))
      .catch(console.error);
  }, [generoSeleccionado]);

  return (
    <div className='genero-contenedor'>
      <h1>Películas por Género</h1>

      <select className="genero-select"
        value={generoSeleccionado}
        onChange={(e) => setGeneroSeleccionado(e.target.value)}
      >
        <option value="">-- Seleccioná un género --</option>
        {generos.map((g, i) => (
          <option key={i} value={g}>{g}</option>
        ))}
      </select>

      {generoSeleccionado && (
        <>
          <h2>Películas de {generoSeleccionado}</h2>
          {peliculas.length === 0 ? (
            <p>No hay películas de este género.</p>
          ) : (
            <div className="peliculas-grid">
              {peliculas.map(p => (
                <div key={p.id} className="pelicula-item">
                  <strong>{p.titulo}</strong> ({p.año})<br />
                  <em>{p.director}</em><br />
                  <img src={p.portada} alt={p.titulo} />
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default GenerosPage;
