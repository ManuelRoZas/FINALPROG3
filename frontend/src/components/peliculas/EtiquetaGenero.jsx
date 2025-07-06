import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/EtiquetaGenero.css';

function EtiquetaGenero({ genero }) {
  const generoUrl = genero.toLowerCase().replace(/\s+/g, '-');

  return (
    <Link to={`/genero/${generoUrl}`} className="etiqueta-genero">
      {genero}
    </Link>
  );
}

export default EtiquetaGenero;
