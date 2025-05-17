import React, { useState, useEffect } from "react";
import { createInventario, updateInventario } from "../../api/inventario";

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
    <form onSubmit={handleSubmit}>
      <h3>{selectedItem ? "Editar Inventario" : "Nuevo Inventario"}</h3>
      <input
        type="text"
        name="nombre"
        value={formData.nombre}
        onChange={handleChange}
        placeholder="Nombre"
        required
      />
      <input
        type="text"
        name="descripcion"
        value={formData.descripcion}
        onChange={handleChange}
        placeholder="Descripción"
        required
      />
      <input
        type="number"
        name="cantidad"
        value={formData.cantidad}
        onChange={handleChange}
        placeholder="Cantidad"
        required
      />
      <input
        type="date"
        name="fecha_ingreso"
        value={formData.fecha_ingreso}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="estado"
        value={formData.estado}
        onChange={handleChange}
        placeholder="Estado"
        required
      />
      <button type="submit">Guardar</button>
      <button type="button" onClick={onCancel}>Cancelar</button>
    </form>
  );
}

export default FormInventario;
