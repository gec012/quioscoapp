import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";



const QuioscoContext = createContext()

const QuioscoProvider = ({ children }) => {
  const [categorias, setCategorias] = useState([])
  const [categoriaActual, setCategoriaActual] = useState({})
  const [producto, setProducto] = useState({})
  const [modal, setModal] = useState(false)
  const [pedido, setPedido] = useState([])
  const [nombre, setNombre] = useState('')
  const [total, setTotal] = useState(0)
  const [nroOrden, setNroOrden] = useState(0);



  const router = useRouter()
  
  const obtenerCategorias = async () => {
    const { data } = await axios('/api/categorias')

    setCategorias(data)
  }
  
 
  const obtenerOrden = async () => {
    try {
      const { data } = await axios(`/api/ordenes/${nroOrden}`);
      
      const { pedido } = data;
     
      const editPedidos = pedido.map((p) => {
        const { nombre, imagen, id } = p.producto;
  
        // Crea un objeto 'editProducto' y devuélvelo
        return {
          cantidad: p.cantidad,
          precio: p.precio,
          nombre: nombre,
          imagen: imagen,
          id: id,
        };
      });
  
      // Actualiza el estado de 'pedido' usando 'setPedido'
      setPedido(editPedidos);
  
      // En este punto, 'pedido' aún no se ha actualizado en el componente,
      // ya que React programará la actualización del estado.
  
      // Puedes acceder a 'editPedidos' directamente, ya que refleja el valor actualizado.
  
   
    } catch (error) {
      // Maneja cualquier error aquí
     
      throw error; // Vuelve a lanzar el error si es necesario
    }
  };
  
 
useEffect(()=>{
 if(nroOrden !==0){
  
   obtenerOrden()
 }

},[nroOrden])


  
  useEffect(() => {
    obtenerCategorias()
  }, [])

  useEffect(() => {
    setCategoriaActual(categorias[0])
  }, [categorias])

  useEffect(() => {
    const nuevoTotal = pedido.reduce((total, producto) => (producto.precio * producto.cantidad) + total, 0)
    setTotal(nuevoTotal)
  }, [pedido])

  const handleClickCategoria = id => {
    const categoria = categorias.filter(cate => cate.id === id)
    setCategoriaActual(categoria[0])
    router.push('/')
  }

  const handleSetProducto = producto => {
    setProducto(producto)
  }

  const handleChangeModal = () => {
    setModal(!modal)
  }

  const handleAgregarPedido = ({ categoriaId, ...producto }) => {
    if (pedido.some(productoState => productoState.id === producto.id)) {
      //actualizar pedido
      const pedidoActualizado = pedido.map(productoAux => productoAux.id === producto.id ? producto : productoAux)

      setPedido(pedidoActualizado)
      toast.success('Guardado Correctamente',{
        
        duration:1000,
        
      })
      
    } else {
      setPedido([...pedido, producto]);
      toast.success('Agregado al Pedido',{
        
        duration:1000,
        
      });
     
    }

    setModal(false)
  }

  const handleEditarCantidades = (id) => {
    const productoActualizar = pedido.filter(producto => producto.id === id)

    setProducto(productoActualizar[0])
    setModal(!modal)
  }
  const handleEliminarProducto = (id) => {

    const pedidoActualizado = pedido.filter(producto => producto.id !== id)

    setPedido(pedidoActualizado)

  }
  const colocarOrden = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/api/ordenes', { pedido, nombre, total, fecha: Date.now().toString() })
      //resetar la app
      setCategoriaActual(categorias[0])
      setPedido([])
      setNombre('')
      setTotal(0)

      toast.success('Pedido Realizado Correctamente')

      setTimeout(()=>{
        router.push('/')
      },2000)

    } catch (error) {
      console.log(error)
    }

  }


  return (
    <QuioscoContext.Provider

      value={{
        categorias,
        categoriaActual,
        handleClickCategoria,
        producto,
        handleSetProducto,
        modal,
        handleChangeModal,
        handleAgregarPedido,
        pedido,
        handleEditarCantidades,
        handleEliminarProducto,
        nombre,
        setNombre,
        colocarOrden,
        nroOrden,
        setNroOrden,
        total
      }}

    >
      {children}
    </QuioscoContext.Provider>
  )
}
export {
  QuioscoProvider
}
export default QuioscoContext