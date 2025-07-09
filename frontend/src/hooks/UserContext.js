import React, { createContext, useState, useContext, useEffect } from 'react';

const UsuarioContext = createContext();

export function UsuarioProvider({ children }) {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
  }, []);

  const actualizarUsuario = (user) => {
    setUsuario(user);
    if (user) {
      localStorage.setItem('usuario', JSON.stringify(user));
    } else {
      localStorage.removeItem('usuario');
    }
  };

  return (
    <UsuarioContext.Provider value={{ usuario, setUsuario: actualizarUsuario }}>
      {children}
    </UsuarioContext.Provider>
  );
};

export function useUsuario() {
  return useContext(UsuarioContext);
}
