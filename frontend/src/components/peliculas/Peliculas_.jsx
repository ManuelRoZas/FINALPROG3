import React, { useState, useEffect } from 'react';
import PeliculaCard from './PeliculaCard';

function Peliculas() {
  const [peliculas, setPeliculas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPeliculas = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/peliculas');
        if (!response.ok) {
          throw new Error('Error al obtener las películas');
        }
        const data = await response.json();
        setPeliculas(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPeliculas();
  }, []);

  if (loading) return <div>Cargando películas...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="peliculas-list">
      {peliculas.map(pelicula => (
        <PeliculaCard key={pelicula.id} pelicula={pelicula} />
      ))}
    </div>
  );
}

export default Peliculas;
