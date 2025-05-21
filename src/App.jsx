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
import Registrate from './Menu/Registrarse/RegistroUsuarioPaciente.jsx';
import Login from './Login/Login.jsx';

function App() {
  const [moduloActivo, setModuloActivo] = useState('inicio');
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    setUsuario(null);
  };

  const handleLoginSuccess = (usuario) => {
    setUsuario(usuario);
  };

  if (!usuario) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  const idRol = usuario.rol?.id_rol;

  return (
    <div>
      <header className="main-header">
        <h1>Sistema de Gestión Clínica</h1>
        <p>Bienvenido, {usuario.nombres}</p>
        <button className="btn btn-danger" onClick={handleLogout}>Cerrar Sesión</button>
      </header>

      <nav className="main-nav">
        <button onClick={() => setModuloActivo('inicio')}>🏠 Inicio</button>

        {idRol === 3 && (
          <button onClick={() => setModuloActivo('usuarios')}>👥 Usuarios</button>
        )}

        {(idRol === 1 || idRol === 2 || idRol === 3) && (
          <button onClick={() => setModuloActivo('citas')}>📅 Citas</button>
        )}

        {idRol === 3 && (
          <button onClick={() => setModuloActivo('inventario')}>🧪 Inventario</button>
        )}

        {(idRol === 2 || idRol === 3) && (
          <button onClick={() => setModuloActivo('historial')}>📋 Historial</button>
        )}

        {(idRol === 1 || idRol === 2 || idRol === 3) && (
          <button onClick={() => setModuloActivo('notificaciones')}>🔔 Notificaciones</button>
        )}

        {(idRol === 2 || idRol === 3) && (
          <button onClick={() => setModuloActivo('pacientes')}>Pacientes</button>
        )}
        <button onClick={() => setModuloActivo('registrate')}>Registrate</button>

      </nav>

      <main>
        {moduloActivo === 'inicio' && <Inicio />}
        {moduloActivo === 'usuarios' && <Usuarios />}
        {moduloActivo === 'citas' && <Citas />}
        {moduloActivo === 'inventario' && <Inventario />}
        {moduloActivo === 'historial' && <Historial />}
        {moduloActivo === 'notificaciones' && <Notificaciones />}
        {moduloActivo === 'pacientes' && <Pacientes usuario={usuario} />}
        {moduloActivo === 'registrate' && <Registrate />}
        
      </main>
    </div>
  );
}

export default App;
