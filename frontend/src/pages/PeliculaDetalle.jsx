import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PeliculaCard from '../components/peliculas/PeliculaCard';
import { useUsuario } from '../hooks/UserContext'; // ✅ Importar el contexto

function PeliculaDetalle() {
  const { id } = useParams();
  const [pelicula, setPelicula] = useState(null);
  const [loading, setLoading] = useState(true);
  const [guardadoInicial, setGuardadoInicial] = useState(false); // ✅ Estado del guardado
  const [vistaInicial, setVistaInicial] = useState(false); // ✅ Estado de la vista
  const [meGustaInicial, setMeGustaInicial] = useState(false);
  const { usuario } = useUsuario(); // ✅ Usuario actual

  useEffect(() => {
    async function fetchDatos() {
      try {
        const resPeli = await fetch(`http://localhost:3001/api/peliculas/${id}`);
        const dataPeli = await resPeli.json();
        setPelicula(dataPeli);
        
      if (usuario?.id) {
        const resEstado = await fetch(`/api/usuarioPeliculas/estado?usuarioId=${usuario.id}&peliculaId=${id}`);
        const estado = await resEstado.json();

        setGuardadoInicial(!!estado.guardado);
        setVistaInicial(!!estado.vista);
        setMeGustaInicial(!!estado.meGusta);
      }

      } catch (err) {
        console.error('Error al cargar los datos:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchDatos();
  }, [id, usuario]);

  if (loading) return <p>Cargando...</p>;
  if (!pelicula) return <p>Película no encontrada</p>;

  return (
    <div>
      <PeliculaCard
     pelicula={pelicula}
     guardadoInicial={guardadoInicial}
     vistaInicial={vistaInicial}
     meGustaInicial={meGustaInicial}
    />

    </div>
  );
}

export default PeliculaDetalle;
