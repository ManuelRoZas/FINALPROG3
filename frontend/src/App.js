import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';

import './styles/navbar.css';
import NavBar from './components/layout/NavBar';
import Home from './pages/Home';
import PeliculasList from './pages/PeliculasList';
import Usuario from './pages/Usuario';
import Generos from './pages/Generos';
import PeliculaDetalle from './pages/PeliculaDetalle';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/peliculas" element={<PeliculasList />} />
        <Route path="/generos" element={<Generos />} />
        <Route path="/usuario" element={<Usuario />} />
        <Route path="/peliculas/:id" element={<PeliculaDetalle />} />
      </Routes>
    </>
  );
}

export default App;
