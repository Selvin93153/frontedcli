import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Contacto() {
  return (
    <div className="container my-5">
      <div className="bg-light p-5 rounded shadow">
        <h2 className="text-center mb-4 text-primary">📞 Contáctanos</h2>

        <p className="text-center lead">
          Si deseas agendar una cita, resolver dudas o conocer más sobre nuestros servicios, aquí encontrarás toda la información necesaria para comunicarte con nosotros.
        </p>

        <hr />

        <div className="row mt-4">
          <div className="col-md-6 mb-4">
            <h4 className="text-success">📍 Nuestra Ubicación</h4>
            <p>Centro Clínico Salud Total<br />Av. Central 4-55, Zona 1<br />Chiquimulilla, Santa Rosa, Guatemala</p>

            <h4 className="text-success">📆 Horario de Atención</h4>
            <p>Lunes a Viernes: 8:00 am - 5:00 pm<br />Sábados: 8:00 am - 12:00 pm</p>
          </div>

          <div className="col-md-6 mb-4">
            <h4 className="text-success">📲 Medios de Contacto</h4>
            <p><strong>Teléfono:</strong> (502) 7845-1234</p>
            <p><strong>WhatsApp:</strong> (502) 4567-8901</p>
            <p><strong>Correo electrónico:</strong> info@clinicamedica.com.gt</p>
            <p><strong>Facebook:</strong> <a href="https://facebook.com/clinicamedica" target="_blank" rel="noreferrer">facebook.com/clinicamedica</a></p>
          </div>
        </div>

        <hr className="my-4" />

        <div className="mt-4">
          <h4 className="text-primary">🗺️ ¿Cómo llegar?</h4>
          <div className="ratio ratio-16x9">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.331941201351!2d-90.39491618590917!3d14.074256090112388!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x858ecbb9f0e4e8e1%3A0xe8e30db12227c902!2sChiquimulilla%2C%20Santa%20Rosa!5e0!3m2!1ses!2sgt!4v1680810738560!5m2!1ses!2sgt"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Ubicación Clínica"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contacto;
