import { useState, useEffect } from 'react';
import { useUsuario } from '../../hooks/UserContext';
import '../common/BotonGuardar.css';

function GuardarParaVer({ peliculaId, guardadoInicial = false, onGuardarCambio }) {
  const [guardado, setGuardado] = useState(guardadoInicial ? 'guardado' : 'neutral');
  const [loading, setLoading] = useState(false);
  const { usuario } = useUsuario();

  useEffect(() => {
    setGuardado(guardadoInicial ? 'guardado' : 'neutral');
  }, [guardadoInicial]);

  const handleClick = async () => {
    if (!usuario?.id) {
      alert('Debes seleccionar un usuario');
      return;
    }

    const nuevoEstado = guardado === 'neutral' ? 'guardado' : 'neutral';
    setLoading(true);
    try {
      const response = await fetch('/api/usuarioPeliculas/marcar-estado', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usuarioId: usuario.id,
          peliculaId,
          campo: 'guardado',
          valor: nuevoEstado === 'guardado',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al guardar');
      }

      setGuardado(nuevoEstado);
      if (onGuardarCambio) onGuardarCambio(peliculaId, nuevoEstado === 'guardado');
    } catch (error) {
      console.error('Error al guardar el estado:', error);
      alert(`Error al actualizar guardar para ver: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const texto = guardado === 'guardado' ? 'Quitar de guardados' : 'Guardar para ver';

  return (
    <button
      className={`boton-guardar ${guardado}`}
      onClick={handleClick}
      disabled={loading}
      aria-pressed={guardado === 'guardado'}
    >
      {loading ? 'Guardando...' : texto}
    </button>
  );
}

export default GuardarParaVer;
