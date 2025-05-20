import { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Citas from './Menu/Citas/Citas.jsx';
import Historial from './Menu/historial/HistorialClinico.jsx';
import Inicio from './Menu/Inicio.jsx';
import Inventario from './Menu/inventario/Inventario.jsx';
import Notificaciones from './Menu/notificaciones/Notificaciones.jsx';
import Usuarios from './Menu/usuarios/Usuarios.jsx';
import Pacientes from './Menu/pacientes/Pacientes.jsx';
import Registrate from  './Menu/Registrarse/RegistroUsuarioPaciente.jsx';

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
        <button onClick={() => setModuloActivo('pacientes')}> Pacientes</button>
         <button onClick={() => setModuloActivo('registrate')}> Registrate</button>
      </nav>

      <main>
        {moduloActivo === 'inicio' && <Inicio />}
        {moduloActivo === 'usuarios' && <Usuarios />}
        {moduloActivo === 'citas' && <Citas />}
        {moduloActivo === 'inventario' && <Inventario />}
        {moduloActivo === 'historial' && <Historial />}
        {moduloActivo === 'notificaciones' && <Notificaciones />}
           {moduloActivo === 'pacientes' && <Pacientes />}
           {moduloActivo === 'registrate' && <Registrate />}
      </main>
    </div>
  );
}

export default App;
