import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';

import './styles/navbar.css';
import NavBar from './components/layout/NavBar'; // <-- Importamos NavBar
import Home from './pages/Home';
import PeliculasList from './pages/PeliculasList';
import Usuario from './pages/Usuario';
import Genero from './pages/Genero';
import PeliculaDetalle from './pages/PeliculaDetalle';

function App() {
  return (
    <>
      <NavBar />  {/* Aquí usamos NavBar con dropdown de usuarios */}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/peliculas" element={<PeliculasList />} />
        <Route path="/genero" element={<Genero />} />
        <Route path="/usuario" element={<Usuario />} />
        <Route path="/peliculas/:id" element={<PeliculaDetalle />} />
      </Routes>
    </>
  );
}

export default App;
