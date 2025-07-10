import { Link } from 'react-router-dom';
import EtiquetaGenero from './EtiquetaGenero';
import GuardarParaVer from '../usuario/GuardarParaVer';
import MarcarVista from '../usuario/MarcarVista';
import ValoracionMeGusta from '../usuario/Valoracion';
import ResenaPersonal from '../usuario/ResenaPersonal';
import React from 'react';
import '../../styles/PeliculaCard.css';

function PeliculaCard({ pelicula, guardadoInicial , vistaInicial, meGustaInicial }) {
  const { id, titulo, portada, meGusta, genero } = pelicula;

  const generos = genero ? genero.split(',').map(g => g.trim()) : [];
  const portadaUrl = portada || 'https://via.placeholder.com/200x300?text=Portada+Ejemplo';

  return (
  <div className='lista-peliculas'>
    <div className="pelicula-card">
      <Link to={`/peliculas/${id}`}>
        <div className="portada-container">
          <img
            src={portadaUrl}
            alt={`Portada de ${titulo}`}
          />
        </div>
      </Link>
      <h3>{titulo}</h3>
      <div className="acciones-container">
       <GuardarParaVer
       peliculaId={id}
       guardadoInicial={guardadoInicial}
      />
        <MarcarVista
          peliculaId={id}
          vistaInicial={vistaInicial}
        />
        <ValoracionMeGusta
          id={id}
          meGustaInicial={meGustaInicial}
        />
      </div>
      <div className="generos-container">
        {generos.map((genero, index) => (
          <EtiquetaGenero key={index} genero={genero} />
        ))}
      </div>
      <div>
        <ResenaPersonal
          pelicula={pelicula}
        />
      </div>
    </div>
  </div>
  );
}

export default PeliculaCard;
