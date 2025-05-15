import { useEffect, useState } from 'react';
import './App.css';

import Citas from './Menu/Citas.jsx';
import Historial from './Menu/Historial.jsx';
import Inicio from './Menu/Inicio.jsx';
import Inventario from './Menu/Inventario.jsx';
import Notificaciones from './Menu/Notificaciones.jsx';
import Usuarios from './Menu/Usuarios.jsx';

function App() {
  const [moduloActivo, setModuloActivo] = useState('inicio');

  useEffect(() => {
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, []);

  return (
    <div>
      <header className="main-header">
        <h1>Sistema de Gestión Clínica</h1>
        <p>Control médico y administrativo centralizado</p>
      </header>

      <nav className="main-nav">
        <button onClick={() => setModuloActivo('inicio')}>🏠 Inicio</button>
        <button onClick={() => setModuloActivo('usuarios')}>👥 Usuarios</button>
        <button onClick={() => setModuloActivo('citas')}>📅 Citas</button>
        <button onClick={() => setModuloActivo('inventario')}>🧪 Inventario</button>
        <button onClick={() => setModuloActivo('historial')}>📋 Historial</button>
        <button onClick={() => setModuloActivo('notificaciones')}>🔔 Notificaciones</button>
      </nav>

      <main>
        {moduloActivo === 'inicio' && <Inicio />}
        {moduloActivo === 'usuarios' && <Usuarios />}
        {moduloActivo === 'citas' && <Citas />}
        {moduloActivo === 'inventario' && <Inventario />}
        {moduloActivo === 'historial' && <Historial />}
        {moduloActivo === 'notificaciones' && <Notificaciones />}
      </main>
    </div>
  );
}

export default App;
