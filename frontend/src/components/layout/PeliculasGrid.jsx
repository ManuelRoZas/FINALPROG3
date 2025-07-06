import React from "react";
import { Link } from "react-router-dom";
import "../../styles/PeliculasGrid.css";

function PeliculasGrid({ peliculas }) {
  return (
    <div className="peliculas-grid">
      {peliculas.map((pelicula) => (
        <div key={pelicula.id} className="pelicula-mini-card">
          <img
            src={pelicula.portada || "https://via.placeholder.com/200x300"}
            alt={`Portada de ${pelicula.titulo}`}
          />
          <h3>{pelicula.titulo}</h3>
          <Link to={`/peliculas/${pelicula.id}`}>
            <button>Ver más</button>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default PeliculasGrid;
