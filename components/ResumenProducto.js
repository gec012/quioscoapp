import Image from "next/image";
import { formatearDinero } from "@/helpers";
import useQuiosco from "@/hooks/useQuiosco";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash,faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const ResumenProducto = ({ producto }) => {
  

  const {handleEditarCantidades, handleEliminarProducto} = useQuiosco()


  return (
    <div className="shadow p-5 mb-3 flex  gap-10 items-center border border-gray-400">
      <div className="md:w1/6 max-md:w-">
        <Image
          width={300}
          height={400}
          alt={`Imagen producto ${producto.nombre}`}
          src={`/assets/img/${producto.imagen}.jpg`}
          className="max-md:w-20"
        />
      </div>
      <div className="md:w-4/6 max-md:w-">
        <p className="text-3xl max-md:text-sm font-bold">{producto.nombre}</p>
        <p className="text-xl max-md:text-sm font-bold mt-2">Cantidad: {producto.cantidad}</p>
        <p className="text-xl max-md:text-sm font-bold mt-2 text-amber-500">
          Precio c/u : {formatearDinero(producto.precio)}
        </p>
        <p className="text-l max-md:text-sm text-gray-700  mt-2">
          Subtotal: {formatearDinero(producto.precio * producto.cantidad)}
        </p>
      </div>
      <div>
        <button
          type="button"
          className="bg-sky-700 flex px-5 max-md:px-2 max-md:py-1 py-2 gap-2 text-white max-md:text-xs rounded-md font-bold uppercase shadow-md w-full max-md:w-20  "
          onClick={()=>handleEditarCantidades(producto.id)}
        >
         <FontAwesomeIcon icon={faPenToSquare} />
          Editar
        </button>
        <button
          type="button"
          className="bg-red-700 flex px-5 py-2 max-md:px-1 max-md:py-1  text-white max-md:text-xs rounded-md font-bold uppercase shadow-md w-full mt-3 max-md:w-20  "
          onClick={()=>handleEliminarProducto(producto.id)} 
        >
        <FontAwesomeIcon icon={faTrash} />
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default ResumenProducto;
