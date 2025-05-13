import React from 'react';

const Producto = ({producto}) => {
  return (
    <div className="producto-card" key={producto.id}>
              <h3>{producto.nombre}</h3>
              <p>{producto.descripcion}</p>
             <p>Precio: ${producto.precio.toFixed(2)}</p>
              {producto.descuento > 0 && <p>Descuento: {producto.descuento}%</p>}
             <p>Stock: {producto.stock}</p>
             <button>Modificar</button>
             <button>Eliminar</button>
    </div>
  );
};

export default Producto;