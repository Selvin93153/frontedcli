import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { createUsuario } from "../../api/usuarios";

function RegistroUsuarioPaciente({ onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    correo: "",
    password: "",
    id_rol: 1, // Rol fijo: número 1
  });

  const [mensaje, setMensaje] = useState(null); // Para mensajes de éxito o error
  const [cargando, setCargando] = useState(false);
  const [mostrarPassword, setMostrarPassword] = useState(false); // Nuevo estado para el ojo

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleMostrarPassword = () => {
    setMostrarPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje(null);
    setCargando(true);
    try {
      const dataToSend = { ...formData, id_rol: Number(formData.id_rol) };
      console.log("Datos que se envían:", dataToSend);
      await createUsuario(dataToSend);
      setMensaje({ tipo: "exito", texto: "Usuario registrado correctamente." });

      // Vaciar campos
      setFormData({
        nombres: "",
        apellidos: "",
        correo: "",
        password: "",
        id_rol: 1,
      });

      onSuccess?.();
    } catch (error) {
      console.error("Error al registrar usuario paciente:", error);
      setMensaje({
        tipo: "error",
        texto: "Error al registrar usuario. Intenta de nuevo.",
      });
    } finally {
      setCargando(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        backgroundColor: "#f1f5f9",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        maxWidth: "450px",
        marginBottom: "1.5rem",
        margin: "2rem auto",
      }}
    >
      <h3 style={{ marginBottom: "15px", color: "#0c63e4", textAlign: "center" }}>
        Registro de Usuario
      </h3>

      {mensaje && (
        <div
          style={{
            marginBottom: "15px",
            color: mensaje.tipo === "exito" ? "green" : "red",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {mensaje.texto}
        </div>
      )}

      <input
        type="text"
        name="nombres"
        placeholder="Nombres"
        value={formData.nombres}
        onChange={handleChange}
        required
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "12px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          fontSize: "15px",
        }}
        disabled={cargando}
      />

      <input
        type="text"
        name="apellidos"
        placeholder="Apellidos"
        value={formData.apellidos}
        onChange={handleChange}
        required
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "12px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          fontSize: "15px",
        }}
        disabled={cargando}
      />

      <input
        type="email"
        name="correo"
        placeholder="Correo electrónico"
        value={formData.correo}
        onChange={handleChange}
        required
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "12px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          fontSize: "15px",
        }}
        disabled={cargando}
      />

      {/* Contenedor para el input de password + ojo */}
      <div
        style={{
          position: "relative",
          marginBottom: "20px",
        }}
      >
        <input
          type={mostrarPassword ? "text" : "password"}
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          required
          disabled={cargando}
          style={{
            width: "100%",
            padding: "10px 40px 10px 10px", // espacio para el ojo
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "15px",
          }}
        />
        <span
          onClick={toggleMostrarPassword}
          style={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            cursor: "pointer",
            userSelect: "none",
            color: "#555",
            fontSize: "18px",
          }}
          aria-label={mostrarPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") toggleMostrarPassword();
          }}
        >
          {mostrarPassword ? "🙈" : "👁️"}
        </span>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button
          type="submit"
          disabled={cargando}
          style={{
            backgroundColor: "#4CAF50",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: cargando ? "not-allowed" : "pointer",
          }}
        >
          {cargando ? "Registrando..." : "Registrarse"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={cargando}
          style={{
            backgroundColor: "#f44336",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: cargando ? "not-allowed" : "pointer",
          }}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

export default RegistroUsuarioPaciente;  