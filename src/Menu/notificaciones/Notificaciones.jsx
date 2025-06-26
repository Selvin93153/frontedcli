import React, { useEffect, useState } from 'react';
import { getNotificaciones, marcarComoLeida, deleteNotificacion } from '../../api/notificaciones';
import FormNotificacion from './FormNotificacion';
import 'bootstrap/dist/css/bootstrap.min.css';

function Notificaciones() {
  const [notificaciones, setNotificaciones] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
  }, []);

  const cargarNotificaciones = async () => {
    try {
      const data = await getNotificaciones();
      let filtradas = data;

      if (usuario?.rol?.id_rol === 1 || usuario?.rol?.id_rol === 2) {
        filtradas = data.filter(n => n.usuario?.id_usuario === usuario.id);
      }

      const adaptadas = Array.isArray(filtradas)
        ? filtradas.map(n => ({
            id: n.id_notificacion,
            mensaje: n.mensaje,
            nombres: n.usuario?.nombres || '',
            apellidos: n.usuario?.apellidos || '',
            leida: n.leida || false
          }))
        : [];

      setNotificaciones(adaptadas);
    } catch (error) {
      console.error('Error al cargar notificaciones:', error);
    }
  };

  useEffect(() => {
    if (usuario) {
      cargarNotificaciones();
    }
  }, [usuario]);

  const handleMostrarFormulario = () => {
    setMostrarFormulario(true);
  };

  const handleOcultarFormulario = () => {
    setMostrarFormulario(false);
    cargarNotificaciones();
  };

  const marcarLeida = async (id) => {
    try {
      await marcarComoLeida(id);
      cargarNotificaciones();
    } catch (error) {
      console.error('Error al marcar como leída:', error);
    }
  };

  const eliminarNotificacion = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta notificación?')) {
      try {
        await deleteNotificacion(id);
        cargarNotificaciones();
      } catch (error) {
        console.error('Error al eliminar notificación:', error);
      }
    }
  };

  const hayNoLeidas = notificaciones.some(n => !n.leida);

  return (
    <div className="container py-4" style={{ background: '#f4f9ff', borderRadius: '10px' }}>
      <h2 className="text-primary mb-4">
        🔔 Notificaciones {hayNoLeidas && <span style={{ color: 'red' }}>📢</span>}
      </h2>

      {(usuario?.rol?.id_rol === 3 || usuario?.rol?.id_rol === 2 || usuario?.rol?.id_rol === 4) && !mostrarFormulario && (
        <button className="btn btn-primary mb-4" onClick={handleMostrarFormulario}>
          ➕ Enviar Notificación
        </button>
      )}

      {mostrarFormulario ? (
        <FormNotificacion onSuccess={handleOcultarFormulario} />
      ) : (
        <div className="row">
          {notificaciones.map((n) => (
            <div className="col-md-6 mb-3" key={n.id}>
              <div className="card shadow-sm" style={{ borderLeft: n.leida ? '5px solid #28a745' : '5px solid #ffc107' }}>
                <div className="card-body">
                  <h5 className="card-title mb-1">
                    📩 {n.nombres} {n.apellidos}
                  </h5>
                  <p className="card-text mb-2">{n.mensaje}</p>
                  <p className="text-muted mb-2">
                    Estado: <strong>{n.leida ? 'Leída ✅' : 'No leída 🔔'}</strong>
                  </p>
                  <div className="d-flex gap-2">
                    {!n.leida && (
                      <button className="btn btn-success btn-sm" onClick={() => marcarLeida(n.id)}>
                        Marcar como leída
                      </button>
                    )}
                    {( usuario?.rol?.id_rol === 1 || usuario?.rol?.id_rol === 2 || usuario?.rol?.id_rol === 3 || usuario?.rol?.id_rol === 4) && (
                      <button className="btn btn-danger btn-sm" onClick={() => eliminarNotificacion(n.id)}>
                        🗑️ Eliminar
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Notificaciones;
