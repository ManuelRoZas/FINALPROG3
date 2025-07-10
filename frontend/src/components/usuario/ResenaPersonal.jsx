import React, { useState, useEffect } from "react";
import { useUsuario } from "../../hooks/UserContext";
import "../common/BotonResena.css";

function ResenaPersonal({ pelicula }) {
  const { usuario } = useUsuario();
  const [resena, setResena] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function cargarResena() {
      if (!usuario?.id || !pelicula?.id) return;

      try {
        const res = await fetch(`/api/usuarioPeliculas/resena?usuarioId=${usuario.id}&peliculaId=${pelicula.id}`);
        const data = await res.json();
        setResena(data.resena || "");
      } catch (error) {
        console.error("Error cargando reseña:", error);
      }
    }

    cargarResena();
  }, [usuario, pelicula]);

  const guardar = async () => {
    if (!usuario?.id) {
      alert("Seleccioná un usuario primero");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/usuarioPeliculas/guardar-resena', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuarioId: usuario.id, peliculaId: pelicula.id, resena }),
      });
      if (!res.ok) throw new Error("Error guardando reseña");
      alert("Reseña guardada con éxito");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <textarea
        value={resena}
        onChange={(e) => setResena(e.target.value)}
        placeholder="Escribí tu reseña aquí..."
        rows={4}
        style={{ width: "100%", padding: "0.5rem" }}
      />
      <button
        onClick={guardar}
        disabled={loading}
      >
        {loading ? "Guardando..." : "Guardar Reseña"}
      </button>
    </div>
  );
}

export default ResenaPersonal;
