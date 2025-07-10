import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  const [peliculas, setPeliculas] = useState([]);

  useEffect(() => {
    async function fetchPeliculasRandom() {
      try {
        const res = await fetch('/api/peliculas/random');
        if (!res.ok) throw new Error("Error al cargar películas");
        const data = await res.json();
        setPeliculas(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchPeliculasRandom();
  }, []);

  return (
    <div className="home-container">
      <h1>Bienvenido a MovieApp 🎬</h1>
      <p className="descripcion">
        Esta es una aplicación para gestionar tus películas favoritas, guardadas, vistas y escribir reseñas personales. ¡Explorá y compartí tus gustos cinéfilos!
      </p>

      <Link to="/usuarios" className="boton-destacado">
        Elegir un usuario
      </Link>

      <section className="destacadas">
        <h2>🎥 Películas destacadas</h2>
        <div className="peliculas-grid">
          {peliculas.length === 0 ? (
            <p>No hay películas para mostrar.</p>
          ) : (
            peliculas.map(peli => (
              <div key={peli.id} className="pelicula-card-destacada">
                <img src={peli.portada} alt={peli.titulo} />
                <p>{peli.titulo}</p>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="generos">
        <h2>🎭 Explorar por género</h2>
        <div className="tags-genero">
          <Link to="/generos" className="tag-genero">Acción</Link>
          <Link to="/generos" className="tag-genero">Drama</Link>
          <Link to="/generos" className="tag-genero">Comedia</Link>
          <Link to="/generos" className="tag-genero">Terror</Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
