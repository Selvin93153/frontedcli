import { useState } from 'react';
import axios from 'axios';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import RegistroUsuarioPaciente from '../Menu/Registrarse/RegistroUsuarioPaciente';
import fondoInicio from '../Imagenes/inicio2.png';

function Login({ onLoginSuccess }) {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [mostrarRegistro, setMostrarRegistro] = useState(false);

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

  const toggleMostrarPassword = () => {
    setMostrarPassword(!mostrarPassword);
  };

  if (mostrarRegistro) {
    return (
      <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="card shadow-lg p-4" style={{ maxWidth: '600px', width: '100%' }}>
          <RegistroUsuarioPaciente
            onSuccess={() => setMostrarRegistro(false)}
            onCancel={() => setMostrarRegistro(false)}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className="vh-100 d-flex align-items-center justify-content-center"
      style={{
        backgroundImage: `url(${fondoInicio})`,
        backgroundSize: '2300px auto', // Reduce visualmente la escala de la imagen
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        position: 'relative',
      }}
    >
      {/* Capa borrosa para suavizar la imagen */}
      <div
        className="position-absolute w-100 h-100"
        style={{
          backdropFilter: 'blur(0px)',
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
          top: 0,
          left: 0,
          zIndex: 0,
        }}
      ></div>

      {/* Cuadro del login */}
      <div
        className="card shadow-lg p-4 position-relative"
        style={{
          maxWidth: '650px',
          width: '100%',
          zIndex: 1,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '1rem',
        }}
      >
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

            <div className="form-group mb-4 position-relative">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <div className="input-group">
                <input
                  type={mostrarPassword ? 'text' : 'password'}
                  className="form-control form-control-lg"
                  id="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  className="input-group-text bg-white"
                  style={{ cursor: 'pointer' }}
                  onClick={toggleMostrarPassword}
                >
                  {mostrarPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </span>
              </div>
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
