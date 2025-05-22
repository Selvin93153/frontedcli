import { useState } from 'react';
import axios from 'axios';
import RegistroUsuarioPaciente from '../Menu/Registrarse/RegistroUsuarioPaciente'; // Asegúrate de que la ruta sea correcta

function Login({ onLoginSuccess }) {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [mostrarRegistro, setMostrarRegistro] = useState(false); // Mostrar formulario de registro

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/auth/login', {
        correo,
        password,
      });
      localStorage.setItem('usuario', JSON.stringify(response.data.user));
      onLoginSuccess(response.data.user);
    } catch (err) {
      setError('Correo o contraseña incorrectos');
    }
  };

  // Si se muestra el formulario de registro
  if (mostrarRegistro) {
    return (
      <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="card shadow-lg p-4" style={{ maxWidth: '500px', width: '100%' }}>
          <RegistroUsuarioPaciente
            onSuccess={() => setMostrarRegistro(false)}
            onCancel={() => setMostrarRegistro(false)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow-lg p-4" style={{ maxWidth: '500px', width: '100%' }}>
        <div className="card-body">
          <h2 className="card-title text-center mb-4 text-primary">🔐 Iniciar Sesión</h2>

          {error && <div className="alert alert-danger text-center">{error}</div>}

          <form onSubmit={handleLogin}>
            <div className="form-group mb-3">
              <label htmlFor="correo" className="form-label">Correo Electrónico</label>
              <input
                type="email"
                className="form-control form-control-lg"
                id="correo"
                placeholder="ejemplo@correo.com"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
              />
            </div>

            <div className="form-group mb-4">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control form-control-lg"
                id="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="d-grid mb-3">
              <button type="submit" className="btn btn-primary btn-lg">
                Ingresar
              </button>
            </div>

            <div className="text-center mt-3">
              <small className="text-muted">¿No tienes cuenta?</small>
              <br />
              <button
                type="button"
                className="btn btn-link mt-1"
                onClick={() => setMostrarRegistro(true)}
              >
                ✍️ Regístrate
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
