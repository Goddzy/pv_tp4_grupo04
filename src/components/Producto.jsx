import React from 'react';

const Producto = ({ producto }) => {
  return (
    <div className="producto-card" key={producto.id}>
      <h3>{producto.nombre}</h3>
      <p>Marca: {producto.marca}</p>
      <p>Precio: ${producto.precio.toFixed(2)}</p>
      {producto.descuento > 0 && <p>Descuento: {producto.descuento}%</p>}
      <p>Stock: {producto.stock}</p>
      <p>Estado: {producto.estado ? "Disponible" : "No disponible"}</p>
    </div>
  );
};

export default Producto;