// src/pages/peliculas/PeliculasList.jsx
import React, { useState, useEffect } from "react";
import PeliculasGrid from "../components/layout/PeliculasGrid";

function PeliculasList() {
  const [peliculas, setPeliculas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPeliculas = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/peliculas");
        if (!response.ok) throw new Error("Error al obtener las películas");
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

  if (loading) return <p>Cargando películas...</p>;
  if (error) return <p>Error: {error}</p>;

  return <PeliculasGrid peliculas={peliculas} />;
}

export default PeliculasList;
