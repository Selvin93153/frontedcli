import React, { useEffect, useState } from 'react';
import { getMedicos, createMedico, getUsuariosMedicos, updateMedico } from '../../api/medicos';
import 'bootstrap/dist/css/bootstrap.min.css';

function Medicos() {
  const [medicos, setMedicos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [especialidad, setEspecialidad] = useState('');
  const [telefono, setTelefono] = useState('');
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState('');
  const [mensaje, setMensaje] = useState(null);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [medicoEditando, setMedicoEditando] = useState(null);

  const usuario = JSON.parse(localStorage.getItem('usuario'));

  const cargarDatos = async () => {
    const lista = await getMedicos();
    setMedicos(lista);
    const usuariosMedicos = await getUsuariosMedicos();
    setUsuarios(usuariosMedicos);
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const limpiarFormulario = () => {
    setEspecialidad('');
    setTelefono('');
    setUsuarioSeleccionado('');
    setModoEdicion(false);
    setMedicoEditando(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const datos = {
      especialidad,
      telefono,
      id_usuario: Number(usuarioSeleccionado),
    };

    try {
      if (modoEdicion) {
        // Para la edición, enviar id_usuario solo si cambió o si quieres permitir editarlo
        const dataActualizar = {
          especialidad,
          telefono,
        };

        // Si quieres permitir cambiar usuario, descomenta esta línea
        // dataActualizar.id_usuario = Number(usuarioSeleccionado);

        await updateMedico(medicoEditando.id_medico, dataActualizar);
        setMensaje({ tipo: 'exito', texto: 'Médico actualizado correctamente.' });
      } else {
        await createMedico(datos);
        setMensaje({ tipo: 'exito', texto: 'Médico creado exitosamente.' });
      }

      limpiarFormulario();
      cargarDatos();
    } catch (error) {
      console.error('❌ Error al guardar médico:', error);
      setMensaje({ tipo: 'error', texto: 'Error al guardar médico.' });
    }
  };

  const iniciarEdicion = (medico) => {
    setModoEdicion(true);
    setMedicoEditando(medico);
    setEspecialidad(medico.especialidad);
    setTelefono(medico.telefono);
    setUsuarioSeleccionado(medico.usuario?.id_usuario || '');
  };

  const cancelarEdicion = () => {
    limpiarFormulario();
    setMensaje(null);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center text-primary">👨‍⚕️ Lista de Médicos</h2>

      {mensaje && (
        <div className={`alert alert-${mensaje.tipo === 'exito' ? 'success' : 'danger'}`} role="alert">
          {mensaje.texto}
        </div>
      )}

      {usuario?.rol?.id_rol === 3 && (
        <form onSubmit={handleSubmit} className="card shadow p-4 mb-4">
          <h4 className="mb-3 text-success">
            {modoEdicion ? '✏️ Editar Médico' : 'Registrar nuevo médico'}
          </h4>

          <div className="row">
            <div className="col-md-4 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Especialidad"
                value={especialidad}
                onChange={(e) => setEspecialidad(e.target.value)}
                required
              />
            </div>

            <div className="col-md-4 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="+502XXXXXXX"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                required
              />
            </div>

            <div className="col-md-4 mb-3">
              <select
                className="form-select"
                value={usuarioSeleccionado}
                onChange={(e) => setUsuarioSeleccionado(e.target.value)}
                required
                // Cambia a false para permitir editar usuario al editar médico
                disabled={modoEdicion /* || false */}
              >
                <option value="">Selecciona un usuario médico...</option>
                {usuarios.map((u) => (
                  <option key={u.id_usuario} value={u.id_usuario}>
                    {u.nombres} {u.apellidos}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button type="submit" className="btn btn-success me-2">
            {modoEdicion ? 'Actualizar Médico' : 'Guardar Médico'}
          </button>

          {modoEdicion && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={cancelarEdicion}
            >
              Cancelar
            </button>
          )}
        </form>
      )}

      <div className="table-responsive shadow-sm">
        <table className="table table-striped table-bordered table-hover align-middle">
          <thead className="table-dark text-center">
            <tr>
              <th>Nombre Completo</th>
              <th>Especialidad</th>
              <th>Teléfono</th>
              <th>Correo</th>
              {usuario?.rol?.id_rol === 3 && <th>Acciones</th>}
            </tr>
          </thead>
          <tbody className="text-center">
            {medicos.map((medico) => (
              <tr key={medico.id_medico}>
                <td>{`${medico.usuario?.nombres} ${medico.usuario?.apellidos}`}</td>
                <td>{medico.especialidad}</td>
                <td>{medico.telefono}</td>
                <td>{medico.usuario?.correo}</td>
                {usuario?.rol?.id_rol === 3 && (
                  <td>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => iniciarEdicion(medico)}
                    >
                      ✏️ Editar
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Medicos;