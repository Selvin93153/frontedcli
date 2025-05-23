import React, { useEffect, useState } from 'react';
import { getMedicos, createMedico, getUsuariosMedicos } from '../../api/medicos';
import 'bootstrap/dist/css/bootstrap.min.css';

function Medicos() {
  const [medicos, setMedicos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [especialidad, setEspecialidad] = useState('');
  const [telefono, setTelefono] = useState('');
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState('');
  const [mensaje, setMensaje] = useState(null);

  // Obtener usuario logueado
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const datosMedico = {
      especialidad,
      telefono,
      id_usuario: Number(usuarioSeleccionado),
    };

    try {
      await createMedico(datosMedico);
      setMensaje({ tipo: 'exito', texto: 'Médico creado exitosamente.' });
      setEspecialidad('');
      setTelefono('');
      setUsuarioSeleccionado('');
      cargarDatos();
    } catch (error) {
      console.error('❌ Error al crear médico:', error);
      setMensaje({ tipo: 'error', texto: 'Error al crear médico.' });
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center text-primary">👨‍⚕️ Lista de Médicos</h2>

      {mensaje && (
        <div className={`alert alert-${mensaje.tipo === 'exito' ? 'success' : 'danger'}`} role="alert">
          {mensaje.texto}
        </div>
      )}

      {/* Solo los usuarios con rol 3 pueden registrar médicos */}
      {usuario?.rol?.id_rol === 3 && (
        <form onSubmit={handleSubmit} className="card shadow p-4 mb-4">
          <h4 className="mb-3 text-success">Registrar nuevo médico</h4>

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

          <button type="submit" className="btn btn-success">Guardar Médico</button>
        </form>
      )}

      <div className="table-responsive shadow-sm">
        <table className="table table-striped table-bordered table-hover align-middle">
          <thead className="table-dark text-center">
            <tr>
              <th>ID</th>
              <th>Nombre Completo</th>
              <th>Especialidad</th>
              <th>Teléfono</th>
              <th>Correo</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {medicos.map((medico) => (
              <tr key={medico.id_medico}>
                <td>{medico.id_medico}</td>
                <td>{`${medico.usuario?.nombres} ${medico.usuario?.apellidos}`}</td>
                <td>{medico.especialidad}</td>
                <td>{medico.telefono}</td>
                <td>{medico.usuario?.correo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Medicos;

