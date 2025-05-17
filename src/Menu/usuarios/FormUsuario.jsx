import React, { useEffect, useState } from "react";
import { createUsuario, updateUsuario } from "../../api/usuarios";
import { getRoles } from "../../api/roles";

function FormUsuario({ selectedUser, onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    correo: "",
    password: "",
    id_rol: ""
  });

  const [roles, setRoles] = useState([]);

  useEffect(() => {
    if (selectedUser) {
      setFormData({
        nombres: selectedUser.nombres,
        apellidos: selectedUser.apellidos,
        correo: selectedUser.correo,
        id_rol: selectedUser.id_rol,
        password: "" // se mantendrá vacío, pero no se enviará
      });
    }
  }, [selectedUser]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const data = await getRoles();
        setRoles(data);
      } catch (error) {
        console.error("Error al obtener roles:", error);
      }
    };

    fetchRoles();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "id_rol" ? parseInt(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (selectedUser) {
        // Omitir contraseña al editar
        const { password, ...dataSinPassword } = formData;
        await updateUsuario(selectedUser.id_usuario, dataSinPassword);
      } else {
        await createUsuario(formData);
      }
      onSuccess();
    } catch (error) {
      console.error("Error al guardar el usuario:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h3>{selectedUser ? "Editar Usuario" : "Nuevo Usuario"}</h3>

      <input
        type="text"
        name="nombres"
        placeholder="Nombres"
        value={formData.nombres}
        onChange={handleChange}
        required
        style={styles.input}
      />

      <input
        type="text"
        name="apellidos"
        placeholder="Apellidos"
        value={formData.apellidos}
        onChange={handleChange}
        required
        style={styles.input}
      />

      <input
        type="email"
        name="correo"
        placeholder="Correo electrónico"
        value={formData.correo}
        onChange={handleChange}
        required
        style={styles.input}
      />

      {!selectedUser && (
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          required
          style={styles.input}
        />
      )}

      <select
        name="id_rol"
        value={formData.id_rol}
        onChange={handleChange}
        required
        style={styles.select}
      >
        <option value="">Seleccione un rol</option>
        {roles.map((rol) => (
          <option key={rol.id_rol} value={rol.id_rol}>
            {rol.nombre}
          </option>
        ))}
      </select>

      <div style={styles.buttons}>
        <button type="submit" style={styles.submitButton}>
          Guardar
        </button>
        <button type="button" onClick={onCancel} style={styles.cancelButton}>
          Cancelar
        </button>
      </div>
    </form>
  );
}

const styles = {
  form: {
    background: "#f9f9f9",
    padding: "20px",
    borderRadius: "8px",
    maxWidth: "400px",
    marginBottom: "20px"
  },
  input: {
    display: "block",
    width: "100%",
    marginBottom: "10px",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc"
  },
  select: {
    display: "block",
    width: "100%",
    marginBottom: "10px",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc"
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between"
  },
  submitButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px 16px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer"
  },
  cancelButton: {
    backgroundColor: "#f44336",
    color: "white",
    padding: "10px 16px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer"
  }
};

export default FormUsuario;
