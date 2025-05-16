import React, { useEffect, useState } from 'react';
import { getInventario } from '../../api/inventario';

function Inventario() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getInventario()
      .then(data => setItems(data))
      .catch(error => console.error('Error al cargar inventario:', error));
  }, []);

  return (
    <div style={{ padding: '2rem', backgroundColor: '#f4f7f9', borderRadius: '10px' }}>
      <h2 style={{ color: '#2c3e50' }}>📦 Inventario</h2>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }} border="1" cellPadding="10">
        <thead style={{ backgroundColor: '#dce6f7' }}>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Cantidad</th>
            <th>Fecha de Ingreso</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id_inventario}>
              <td>{item.id_inventario}</td>
              <td>{item.nombre}</td>
              <td>{item.descripcion}</td>
              <td>{item.cantidad}</td>
              <td>{new Date(item.fecha_ingreso).toLocaleDateString()}</td>
              <td>{item.estado}</td>
            </tr>
          ))}
          {items.length === 0 && (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center' }}>
                No hay datos de inventario disponibles.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Inventario;
