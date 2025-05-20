import doctorImg from "../Imagenes/doctor.jpg";
import 'bootstrap/dist/css/bootstrap.min.css';

function Inicio() {
  return (
    <div className="container mt-5">
      <style>
        {`
          .doctor-img {
            max-height: 480px;
            object-fit: cover;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            border-radius: 1rem;
          }

          .doctor-img:hover {
            transform: scale(1.05);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
          }

          .welcome-card {
            background: linear-gradient(to right, #f4f9ff, #e3f1ff);
            border-radius: 2rem;
            box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
            border: none;
            padding: 3rem;
          }

          .welcome-title {
            color: #003366;
            font-weight: 800;
            font-size: 2.7rem;
          }

          .welcome-text {
            color: #444;
            font-size: 1.25rem;
            line-height: 1.8;
            margin-bottom: 1.5rem;
          }

          .highlight-box {
            background: #cce9ff;
            padding: 1rem 1.2rem;
            border-radius: 16px;
            color: #0056b3;
            font-weight: 600;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            margin-bottom: 2rem;
            font-size: 1.1rem;
          }

          .benefits-list li {
            font-size: 1.15rem;
            color: #333;
            margin-bottom: 1rem;
          }

          @media (max-width: 768px) {
            .welcome-title {
              font-size: 2rem;
            }

            .welcome-card {
              padding: 2rem;
            }

            .doctor-img {
              max-height: 320px;
            }
          }
        `}
      </style>

      <div className="card welcome-card">
        <div className="row align-items-center">
          {/* Texto */}
          <div className="col-lg-6 col-md-12 mb-4 mb-lg-0">
            <h2 className="welcome-title">Bienvenido al sistema</h2>
            <p className="welcome-text">
              Plataforma moderna de gestión para el personal autorizado de la clínica. Accedé a tus módulos administrativos y médicos con total facilidad.
            </p>

            <div className="highlight-box">
              🧑‍⚕️ El futuro de la salud comienza aquí
            </div>

            <ul className="benefits-list list-unstyled">
              <li>📅 Gestioná tus citas médicas con facilidad.</li>
              <li>💉 Controlá los insumos y medicamentos en tiempo real.</li>
              <li>📁 Accedé a los historiales clínicos de manera segura.</li>
              <li>🔔 Recibí notificaciones automáticas relevantes.</li>
            </ul>
          </div>

          {/* Imagen */}
          <div className="col-lg-6 col-md-12 text-center">
            <img
              src={doctorImg}
              alt="Médico del sistema"
              className="img-fluid doctor-img shadow"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inicio;
