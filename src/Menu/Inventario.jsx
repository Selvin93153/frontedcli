import { useState } from 'react';

function Inventario() {
  const [items, setItems] = useState([
    { id: 1, nombre: 'Guantes', cantidad: 8, unidad: 'cajas', alertaMinima: 10 }
  ]);

  const [formulario, setFormulario] = useState({
    nombre: '',
    cantidad: '',
    unidad: '',
    alertaMinima: ''
  });

  const handleChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoItem = {
      id: items.length + 1,
      nombre: formulario.nombre,
      cantidad: parseInt(formulario.cantidad),
      unidad: formulario.unidad,
      alertaMinima: parseInt(formulario.alertaMinima)
    };
    setItems([...items, nuevoItem]);
    setFormulario({ nombre: '', cantidad: '', unidad: '', alertaMinima: '' });
  };

  return (
    <div style={{ backgroundColor: '#f9f9f9', padding: '2rem', borderRadius: '12px', marginBottom: '2rem' }}>
      <h2 style={{ color: '#0c63e4' }}>💉 Inventario Médico</h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
        <input name="nombre" value={formulario.nombre} onChange={handleChange} placeholder="Nombre del insumo" required />
        <input name="cantidad" type="number" value={formulario.cantidad} onChange={handleChange} placeholder="Cantidad" required />
        <input name="unidad" value={formulario.unidad} onChange={handleChange} placeholder="Unidad (ej. cajas)" required />
        <input name="alertaMinima" type="number" value={formulario.alertaMinima} onChange={handleChange} placeholder="Alerta mínima" required />
        <button type="submit" style={{ backgroundColor: '#0c63e4', color: 'white', padding: '0.5rem 1rem', border: 'none', borderRadius: '5px' }}>
          Agregar
        </button>
      </form>

      <h3>Listado de Insumos</h3>
      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#e0efff' }}>
            <th>ID</th><th>Nombre</th><th>Cantidad</th><th>Unidad</th><th>Alerta Mínima</th><th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => {
            const enAlerta = item.cantidad < item.alertaMinima;
            return (
              <tr key={item.id} style={{ backgroundColor: enAlerta ? '#ffe0e0' : 'white' }}>
                <td>{item.id}</td>
                <td>{item.nombre}</td>
                <td>{item.cantidad}</td>
                <td>{item.unidad}</td>
                <td>{item.alertaMinima}</td>
                <td>{enAlerta ? '🔴 Bajo stock' : '🟢 OK'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Inventario;
