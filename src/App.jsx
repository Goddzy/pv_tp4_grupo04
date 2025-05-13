import './styles/style.css';
import Producto from './components/Producto';
import { useState, useEffect } from 'react';

function App() {
  // Estados para los inputs
  const [listaProductos, setListaProductos] = useState([]);
  const [id, setId] = useState(0);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precioUnitario, setPrecioUnitario] = useState('');
  const [descuento, setDescuento] = useState('');
  const [stock, setStock] = useState('');


  //mostrar con el useEffect el array productos cada vez que se modifica (y 1 vez cuando se monta la página)
  useEffect(()=>{
    console.log(listaProductos);
  }, [listaProductos])

  const agregarProducto = (e)=>{
    e.preventDefault();
    if(nombre.trim() != '' && descripcion.trim() != '' && precioUnitario.trim() != '' && stock.trim()!=''){

      //en caso de que el usuario no haya colocado un descuento
      if(descuento.trim () == ''){
        setDescuento('0')
      }
      
      let productoNuevo = {
        id: id,
        nombre: nombre,
        descripcion: descripcion,
        precio: parseFloat(precioUnitario),
        descuento: parseFloat(descuento),
        stock: parseFloat(stock)
      }

      setListaProductos([...listaProductos, productoNuevo]);
      
      //incrementar el ID
      setId(id +1);

      //vaciar los campos de los inputs
      setNombre('');
      setDescripcion('');
      setPrecioUnitario('');
      setDescuento('');
      setStock('');
    }
  }

  return (
    <div className="contenedor">
      <form>
        <input
          type="text"
          disabled
          placeholder={id}
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <input
          type="text"
          placeholder='Nombre del producto'
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="text"
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
        <input
          type="number"
          placeholder="Precio Unitario"
          value={precioUnitario}
          onChange={(e) => setPrecioUnitario(e.target.value)}
        />
        <input
          type="number"
          placeholder="Descuento (%)"
          value={descuento}
          onChange={(e) => setDescuento(e.target.value)}
        />
        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
        <button onClick={agregarProducto}>Agregar un producto</button>
        <input type="text" placeholder="Buscar un producto" />
        <h2>Productos</h2>
        <div className="producto-lista">

         {listaProductos.map((producto) => (
            <Producto producto={producto} key={producto.id}></Producto>
          ))}
       </div>
      </form>
    </div>
  );
}

export default App;
