import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import 'bootstrap/dist/js/bootstrap.bundle.min.js';


import Citas from './Menu/Citas/Citas.jsx';
import Historial from './Menu/historial/HistorialClinico.jsx';
import Inicio from './Menu/Inicio.jsx';
import Inventario from './Menu/inventario/Inventario.jsx';
import Notificaciones from './Menu/notificaciones/Notificaciones.jsx';
import Usuarios from './Menu/usuarios/Usuarios.jsx';
import Pacientes from './Menu/pacientes/Pacientes.jsx';
import Login from './Login/Login.jsx';
import Medicos from './Menu/medicos/Medicos.jsx';
import Contacto from './Menu/Contacto.jsx';



function App() {
  const [moduloActivo, setModuloActivo] = useState('inicio');
  const [usuario, setUsuario] = useState(null);
  const [sidebarAbierto, setSidebarAbierto] = useState(true);

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
    <div className="d-flex" style={{ minHeight: "100vh", overflow: "hidden" }}>
      {/* Sidebar */}
      <div
        className={`bg-primary text-white p-3 sidebar transition ${sidebarAbierto ? 'expanded' : 'collapsed'}`}
        style={{
          width: sidebarAbierto ? '250px' : '70px',
          transition: 'width 0.3s',
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="m-0">{sidebarAbierto ? 'Clínica' : '🩺'}</h5>
          <button className="btn btn-sm btn-light" onClick={() => setSidebarAbierto(!sidebarAbierto)}>
            {sidebarAbierto ? '«' : '»'}
          </button>
        </div>

        <button className="btn btn-outline-light w-100 mb-2" onClick={() => setModuloActivo('inicio')}>🏠 {sidebarAbierto && 'Inicio'}</button>

        {idRol === 3 && (
          <button className="btn btn-outline-light w-100 mb-2" onClick={() => setModuloActivo('usuarios')}>👥 {sidebarAbierto && 'Usuarios'}</button>
        )}

        {(idRol === 1 || idRol === 2 || idRol === 3 || idRol ==4) && (
          <button className="btn btn-outline-light w-100 mb-2" onClick={() => setModuloActivo('citas')}>📅 {sidebarAbierto && 'Citas'}</button>
        )}

       {(idRol === 3 || idRol ==4)&& (
          <button className="btn btn-outline-light w-100 mb-2" onClick={() => setModuloActivo('inventario')}>🧪 {sidebarAbierto && 'Inventario'}</button>
        )}

        {(idRol === 2 || idRol === 3) && (
          <button className="btn btn-outline-light w-100 mb-2" onClick={() => setModuloActivo('historial')}>📋 {sidebarAbierto && 'Historial'}</button>
        )}

        {(idRol === 1 || idRol === 2 || idRol === 3 || idRol === 4 ) && (
          <button className="btn btn-outline-light w-100 mb-2" onClick={() => setModuloActivo('notificaciones')}>🔔 {sidebarAbierto && 'Notificaciones'}</button>
        )}

        {(idRol === 1 || idRol === 2 || idRol === 3) && (
          <button className="btn btn-outline-light w-100 mb-2" onClick={() => setModuloActivo('medicos')}>🧑‍⚕️ {sidebarAbierto && 'Médicos'}</button>
        )}

        {(idRol === 2 || idRol === 3 || idRol === 4) && (
          <button className="btn btn-outline-light w-100 mb-2" onClick={() => setModuloActivo('pacientes')}>🧑‍🤝‍🧑 {sidebarAbierto && 'Pacientes'}</button>
        )}
         {(idRol === 1 || idRol === 2 || idRol === 3 || idRol === 4) && (
        <button className="btn btn-outline-light w-100 mb-2" onClick={() => setModuloActivo('contacto')}>📞 Contacto</button>
       )}

        <button className="btn btn-danger w-100 mt-4" onClick={handleLogout}>🚪 {sidebarAbierto && 'Cerrar Sesión'}</button>
      </div>

      {/* Contenido principal */}
      <div className="flex-grow-1 p-4" style={{ backgroundColor: "#f8f9fa" }}>
        <h2 className="mb-4">Bienvenido, {usuario.nombres}</h2>

        {moduloActivo === 'inicio' && <Inicio />}
        {moduloActivo === 'usuarios' && <Usuarios />}
        {moduloActivo === 'citas' && <Citas usuario={usuario} />}
        {moduloActivo === 'inventario' && <Inventario />}
        {moduloActivo === 'historial' && <Historial />}
        {moduloActivo === 'notificaciones' && <Notificaciones usuario={usuario} />}
        {moduloActivo === 'medicos' && <Medicos />}
        {moduloActivo === 'pacientes' && <Pacientes usuario={usuario} />}
        {moduloActivo === 'contacto' && <Contacto usuario={usuario} />}

       
      </div>
    </div>
  );
}

export default App;
