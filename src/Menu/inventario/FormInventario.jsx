import React, { useState, useEffect } from "react";
import { createInventario, updateInventario } from "../../api/inventario";
import 'bootstrap/dist/css/bootstrap.min.css';

function FormInventario({ selectedItem, onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    cantidad: "",
    fecha_ingreso: "",
    estado: ""
  });

  useEffect(() => {
    if (selectedItem) {
      setFormData(selectedItem);
    }
  }, [selectedItem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "cantidad" ? parseInt(value, 10) || 0 : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("ID para actualizar:", selectedItem?.id_inventario);
      console.log("Datos enviados:", JSON.stringify(formData, null, 2));

      if (selectedItem) {
        const { id_inventario, ...dataToUpdate } = formData;
        await updateInventario(selectedItem.id_inventario, dataToUpdate);
      } else {
        await createInventario(formData);
      }
      onSuccess();
    } catch (error) {
      console.error("Error al guardar el inventario:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="container"
      style={{
        maxWidth: "600px",
        margin: "2rem auto",
        background: "#f8fafc",
        padding: "2rem",
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)"
      }}
    >
      <h3
        style={{
          textAlign: "center",
          marginBottom: "1.5rem",
          color: "#0c63e4",
          fontWeight: "bold"
        }}
      >
        {selectedItem ? "Editar Inventario" : "Nuevo Inventario"}
      </h3>

      <div className="mb-3">
        <label className="form-label">Nombre</label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          className="form-control"
          placeholder="Nombre del producto"
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Descripción</label>
        <input
          type="text"
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          className="form-control"
          placeholder="Descripción detallada"
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Cantidad</label>
        <input
          type="number"
          name="cantidad"
          value={formData.cantidad}
          onChange={handleChange}
          className="form-control"
          placeholder="0"
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Fecha de ingreso</label>
        <input
          type="date"
          name="fecha_ingreso"
          value={formData.fecha_ingreso}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      <div className="mb-4">
        <label className="form-label">Estado</label>
        <input
          type="text"
          name="estado"
          value={formData.estado}
          onChange={handleChange}
          className="form-control"
          placeholder="Disponible, No disponible, etc."
          required
        />
      </div>

      <div className="d-flex justify-content-between">
        <button
          type="submit"
          className="btn btn-primary"
          style={{
            width: "48%",
            backgroundColor: "#0c63e4",
            border: "none",
            fontWeight: "bold",
            padding: "10px"
          }}
        >
          Guardar
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="btn btn-secondary"
          style={{
            width: "48%",
            backgroundColor: "#6c757d",
            border: "none",
            fontWeight: "bold",
            padding: "10px"
          }}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

export default FormInventario;
