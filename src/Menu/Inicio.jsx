import doctorImg from "../Imagenes/doctor.jpg";

function Inicio() {
  return (
    <div className="card-panel">
      <div style={{ flex: '1 1 50%', minWidth: '280px' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: '700', color: '#003366' }}>Bienvenido al sistema</h2>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.6', margin: '1rem 0', color: '#444' }}>
          Plataforma de gestión para personal autorizado de la clínica. Accedé a tus módulos administrativos y médicos con un solo clic.
        </p>
        <div style={{ background: '#dceeff', padding: '0.8rem 1rem', borderRadius: '8px', marginBottom: '1.5rem', color: '#0056b3', fontWeight: '600' }}>
          🧑‍⚕️ El futuro esta en tus manos<strong></strong>
        </div>
        <ul style={{ padding: 0, listStyle: 'none', color: '#333', lineHeight: '1.8' }}>
          <li>📅 Gestioná tus citas médicas con facilidad.</li>
          <li>💉 Controlá los insumos y medicamentos en tiempo real.</li>
          <li>📁 Accedé a los historiales clínicos de manera segura.</li>
          <li>🔔 Recibí notificaciones automáticas relevantes.</li>
        </ul>
      </div>

      <div style={{ flex: '1 1 40%', display: 'flex', justifyContent: 'center', minWidth: '250px' }}>
        <img
          src={doctorImg}
          alt="Médico del sistema"
          style={{ maxWidth: '100%', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
        />
      </div>
    </div>
  );
}

export default Inicio;
