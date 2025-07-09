import { useState, useEffect } from 'react';

function GenerosPage() {
  const [generos, setGeneros] = useState([]);
  const [generoSeleccionado, setGeneroSeleccionado] = useState('');
  const [peliculas, setPeliculas] = useState([]);

useEffect(() => {
  fetch('/api/peliculas/generos')
    .then(res => res.json())
    .then(data => {
      console.log('Respuesta de /generos:', data);  // 👈 esto
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
    <div style={{ padding: 20 }}>
      <h1>Películas por Género</h1>

      <select
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
            <ul>
              {peliculas.map(p => (
                <li key={p.id}>
                  {p.titulo} ({p.año}) - {p.director}
                  <br />
                  <img src={p.portada} alt={p.titulo} style={{ width: 100, marginTop: 5 }} />
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}

export default GenerosPage;
