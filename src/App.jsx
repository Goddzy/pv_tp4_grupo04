import './styles/style.css';
import Producto from './components/Producto';
import { useState, useEffect } from 'react';

function App() {
  // Estados para los inputs
  const [listaProductos, setListaProductos] = useState([]);

  //state para la búsqueda y renderizado de elementos
  const [productosFiltrados, setProductosFiltrados] = useState(listaProductos);
  const [id, setId] = useState(0);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precioUnitario, setPrecioUnitario] = useState('');
  const [descuento, setDescuento] = useState('');
  const [stock, setStock] = useState('');
  const [buscado, setBuscado] = useState('');
  const [editandoId, setEditandoId] = useState(null);
  const [nuevoPrecio, setNuevoPrecio] = useState('');


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


  const buscarElemento =(textoABuscar)=>{
    const nuevoArray = listaProductos.filter((p)=> p.descripcion.toLowerCase().includes(textoABuscar.toLowerCase()) || p.id == parseInt(textoABuscar))

    setProductosFiltrados(nuevoArray);

  }

  const modificarPrecio = (id) => {
    setListaProductos(listaProductos.map(producto =>
      producto.id === id ? { ...producto, precio: parseFloat(nuevoPrecio) } : producto
    ));
    setEditandoId(null);
    setNuevoPrecio('');
  };

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
        <input type="text" placeholder="Buscar un producto" onChange={(e)=>{
          setBuscado(e.target.value)

          buscarElemento(e.target.value)

          }} /> 
        <h2>Productos</h2>
        <div className="producto-lista">
          {(buscado.trim() === '' ? listaProductos : productosFiltrados).map((producto) => (
            <div key={producto.id}>
              <Producto producto={producto} />
              {editandoId === producto.id ? (
                <>
                  <input
                    type="number"
                    value={nuevoPrecio}
                    onChange={(e) => setNuevoPrecio(e.target.value)}
                    placeholder="Nuevo precio"
                  />
                  <button type="button" onClick={() => modificarPrecio(producto.id)}>Guardar</button>
                  <button type="button" onClick={() => setEditandoId(null)}>Cancelar</button>
                </>
              ) : (
                <button type="button" onClick={() => { setEditandoId(producto.id); setNuevoPrecio(producto.precio); }}>
                  Modificar
                </button>
              )}
            </div>
          ))}
        </div>
      </form>
    </div>
  );
}
//a

export default App;
