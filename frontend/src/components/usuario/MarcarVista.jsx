import { useState, useEffect } from 'react';
import { useUsuario } from '../../hooks/UserContext';
import '../common/BotonGuardar.css';

function MarcarVista({ peliculaId, vistaInicial = false, onVistaCambio }) {
  const [vista, setVista] = useState(vistaInicial);
  const [loading, setLoading] = useState(false);
  const { usuario } = useUsuario();

  useEffect(() => {
    setVista(vistaInicial);
  }, [vistaInicial]);

  const handleClick = async () => {
    if (!usuario?.id) {
      alert('Debes seleccionar un usuario');
      return;
    }

    const nuevoEstado = !vista;
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
          campo: 'vista',
          valor: nuevoEstado,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al marcar vista');
      }

      setVista(nuevoEstado);
      if (onVistaCambio) onVistaCambio(peliculaId, nuevoEstado);
    } catch (error) {
      console.error('Error al marcar vista:', error);
      alert(`Error al marcar vista: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const texto = vista ? 'Vista ✔' : 'Marcar como vista';

  return (
    <button
      className={`boton-guardar ${vista ? 'guardado' : ''}`}
      onClick={handleClick}
      disabled={loading}
    >
      {loading ? 'Actualizando...' : texto}
    </button>
  );
}

export default MarcarVista;
