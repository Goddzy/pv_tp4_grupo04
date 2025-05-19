import './styles/style.css';
import Producto from './components/Producto';
import { useState, useEffect, useCallback } from 'react';

function App() {
  // Estados para los inputs
  const [listaProductos, setListaProductos] = useState([]);

  // State para la búsqueda y renderizado de elementos
  const [productosFiltrados, setProductosFiltrados] = useState(listaProductos);
  const [id, setId] = useState(0);
  const [nombre, setNombre] = useState('');
  const [marca, setMarca] = useState(''); // Se reemplaza "descripcion" por "marca"
  const [precioUnitario, setPrecioUnitario] = useState('');
  const [descuento, setDescuento] = useState('');
  const [stock, setStock] = useState('');
  const [estado, setEstado] = useState(true);
  const [buscado, setBuscado] = useState('');

   //mostrar con el useEffect el array productos cada vez que se modifica (y 1 vez cuando se monta la página)
  useEffect(() => {
    console.log(listaProductos);
  }, [listaProductos]);

  const agregarProducto = (e) => {
    e.preventDefault();
    if (
      nombre.trim() !== '' &&
      marca.trim() !== '' &&
      precioUnitario.trim() !== '' &&
      stock.trim() !== ''
    ) {
       //en caso de que el usuario no haya colocado un descuento
      if (descuento.trim() === '') {
        setDescuento('0');
      }

      let productoNuevo = {
        id: id,
        nombre: nombre,
        marca: marca,
        precio: parseFloat(precioUnitario),
        descuento: parseFloat(descuento),
        stock: parseFloat(stock),
        estado: estado // Se asigna el estado inicial (disponible o no disponible)
      };
       
      setListaProductos([...listaProductos, productoNuevo]);
       
      //incrementar el ID
      setId(id + 1);

       //vaciar los campos de los inputs
      setNombre('');
      setMarca('');
      setPrecioUnitario('');
      setDescuento('');
      setStock('');
      setEstado(true);
    }
  };

  const buscarElemento = (textoABuscar) => {
    const nuevoArray = listaProductos.filter(
      (p) =>
        p.marca.toLowerCase().includes(textoABuscar.toLowerCase()) ||
        p.id === parseInt(textoABuscar)
    );
    setProductosFiltrados(nuevoArray);
  };

  // Función para alternar el estado del producto
  const toggleEstadoProducto = useCallback((productoId) => {
    setListaProductos((prevProductos) =>
      prevProductos.map((producto) =>
        producto.id === productoId ? { ...producto, estado: !producto.estado } : producto
      )
    );
  }, []);

  return (
    <div className="contenedor">
      <form>
        <input type="text" 
        disabled 
        placeholder={id} 
        value={id} 
        onChange={(e) => setId(e.target.value)} 
        />

        <input type="text" 
        placeholder="Nombre del producto" 
        value={nombre} 
        onChange={(e) => setNombre(e.target.value)}
         />
        <input type="text"
         placeholder="Marca" 
         value={marca}
         onChange={(e) => setMarca(e.target.value)} 
         />
        <input type="number" 
        placeholder="Precio Unitario" 
        value={precioUnitario} 
        onChange={(e) => setPrecioUnitario(e.target.value)} 
        />
        <input type="number" 
        placeholder="Descuento (%)" 
        value={descuento} 
        onChange={(e) => setDescuento(e.target.value)} 
        />
        <input type="number" 
        placeholder="Stock" 
        value={stock} onChange={(e) => setStock(e.target.value)} 
        />
        <label>
          Estado:
          <select value={estado ? 'disponible' : 'no disponible'} onChange={(e) => setEstado(e.target.value === 'disponible')}>
            <option value="disponible">Disponible</option>
            <option value="no disponible">No disponible</option>
          </select>
        </label>
        <button onClick={agregarProducto}>Agregar un producto</button>
        <input type="text" placeholder="Buscar un producto" onChange={(e) => {
            setBuscado(e.target.value);
            buscarElemento(e.target.value);
          }} />
        <h2>Productos</h2>
        <div className="producto-lista">

            {/* Cuando se esta buscando, muestra todos los productos (disponibles y no disponibles)  */ }

           {(buscado.trim() === '' ? listaProductos.filter((producto) => producto.estado) : productosFiltrados
          ).map((producto) => (
            <div key={producto.id}>
              <Producto producto={producto} />
              <button onClick={() => toggleEstadoProducto(producto.id)}>
                {producto.estado ? 'Ocultar Producto' : 'Ocultar Producto' }
              </button>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
}


export default App;

