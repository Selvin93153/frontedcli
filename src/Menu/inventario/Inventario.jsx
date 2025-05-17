import React, { useEffect, useState } from "react";
import { getInventario } from "../../api/inventario";
import FormInventario from "./FormInventario";

function Inventario() {
  const [inventario, setInventario] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchInventario = async () => {
    try {
      const data = await getInventario();
      setInventario(data);
    } catch (error) {
      console.error("Error al obtener inventario:", error);
    }
  };

  useEffect(() => {
    fetchInventario();
  }, []);

  const handleEdit = (item) => {
    setSelectedItem(item);
    setShowForm(true);
  };

  const handleNew = () => {
    setSelectedItem(null);
    setShowForm(true);
  };

  const handleSuccess = () => {
    setShowForm(false);
    fetchInventario();
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📦 Inventario</h2>
      <button style={styles.addButton} onClick={handleNew}>+ Nuevo</button>

      {showForm && (
        <FormInventario
          selectedItem={selectedItem}
          onSuccess={handleSuccess}
          onCancel={() => setShowForm(false)}
        />
      )}

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Nombre</th>
            <th style={styles.th}>Descripción</th>
            <th style={styles.th}>Cantidad</th>
            <th style={styles.th}>Fecha Ingreso</th>
            <th style={styles.th}>Estado</th>
            <th style={styles.th}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {inventario.map((item) => (
            <tr key={item.id_inventario}>
              <td style={styles.td}>{item.nombre}</td>
              <td style={styles.td}>{item.descripcion}</td>
              <td style={styles.td}>{item.cantidad}</td>
              <td style={styles.td}>{item.fecha_ingreso}</td>
              <td style={styles.td}>{item.estado}</td>
              <td style={styles.td}>
                <button style={styles.editButton} onClick={() => handleEdit(item)}>
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    marginBottom: "15px",
    color: "#333",
  },
  addButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px 15px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginBottom: "15px",
    fontSize: "14px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    borderRadius: "8px",
    overflow: "hidden",
  },
  th: {
    backgroundColor: "#f4f4f4",
    padding: "12px",
    borderBottom: "2px solid #ddd",
    textAlign: "left",
    color: "#333",
  },
  td: {
    padding: "10px 12px",
    borderBottom: "1px solid #eee",
    color: "#555",
  },
  editButton: {
    backgroundColor: "#2196F3",
    color: "white",
    padding: "6px 12px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "13px",
  }
};

export default Inventario;
