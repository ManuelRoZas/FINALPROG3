import React, { useEffect, useState } from 'react';
import { useUsuario } from '../../hooks/UserContext';
import '../../styles/navbar.css';

function NavBar() {
  const { usuario, setUsuario } = useUsuario();
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    fetch('/api/usuarios')
      .then(res => res.json())
      .then(data => setUsuarios(data))
      .catch(console.error);
  }, []);

  function handleChange(e) {
    const userId = e.target.value;
    const user = usuarios.find(u => u.id === Number(userId));
    setUsuario(user);
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/" className="navbar-brand">Proyecto Final Prog3</a>
        <ul className="navbar-menu">
          <li><a href="/">Inicio</a></li>
          <li><a href="/peliculas">Películas</a></li>
          <li><a href="/generos">Géneros</a></li>
          <li><a href="/usuario">Usuario</a></li>
          <li>
            <select onChange={handleChange} value={usuario?.id || ''}>
              <option value="">Selecciona usuario</option>
              {usuarios.map(u => (
                <option key={u.id} value={u.id}>{u.nombre}</option>
              ))}
            </select>
          </li>
        </ul>
        {usuario && <div className='usuario-seleccionado'>Usuario seleccionado: {usuario.nombre}</div>}
      </div>
    </nav>
  );
}

export default NavBar;
