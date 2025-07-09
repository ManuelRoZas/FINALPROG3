import { useState, useEffect } from 'react';
import { useUsuario } from '../../hooks/UserContext';
import '../common/BotonMeGusta.css'; // podés agregar estilos ahí

function ValoracionMeGusta({ id: peliculaId, meGustaInicial = null }) {
  const [valoracion, setValoracion] = useState(meGustaInicial); // puede ser true, false o null
  const { usuario } = useUsuario();

  useEffect(() => {
    setValoracion(meGustaInicial);
  }, [meGustaInicial]);

  const actualizarValoracion = async (nuevoValor) => {
    if (!usuario?.id) {
      alert('Debes seleccionar un usuario');
      return;
    }

    const valorAEnviar = valoracion === nuevoValor ? null : nuevoValor;

    try {
      const response = await fetch('/api/usuarioPeliculas/marcar-estado', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usuarioId: usuario.id,
          peliculaId,
          campo: 'meGusta',
          valor: valorAEnviar,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al actualizar valoración');
      }

      setValoracion(valorAEnviar);
    } catch (err) {
      console.error(err);
      alert('Error al actualizar valoración');
    }
  };

  return (
    <div className="valoracion-botones">
      <button
        className={`mano ${valoracion === true ? 'seleccionado' : ''}`}
        onClick={() => actualizarValoracion(true)}
      >
        👍
      </button>
      <button
        className={`mano ${valoracion === false ? 'seleccionado' : ''}`}
        onClick={() => actualizarValoracion(false)}
      >
        👎
      </button>
    </div>
  );
}

export default ValoracionMeGusta;
