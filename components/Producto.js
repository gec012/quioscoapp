import Image from "next/image";
import { formatearDinero } from "@/helpers";
import useQuiosco from "@/hooks/useQuiosco";

const Producto = ({ producto }) => {

  const  {handleSetProducto, handleChangeModal} = useQuiosco()
  const { imagen, nombre, precio } = producto;
  return (
    <div className="border-4 p-3">
      <Image
        src={`/assets/img/${imagen}.jpg`}
        alt={`Imagen Platillo ${nombre}`}
        width={400}
        height={500}
      />
      <div className="p-5">
        <h3 className="max-md:text-xs text-2xl font-bold">{nombre}</h3>
        <p className="mt-5 max-md:text-xs font-black text-4xl text-amber-500">
          {formatearDinero(precio)}
        </p>
        <button
          type="button"
          className="bg-indigo-600 max-md:text-xs hover:bg-indigo-800 text-white w-full mt-4 p-1 uppercase font-bold"
          onClick={()=>{
            handleChangeModal()
            handleSetProducto(producto)
            
        }}
        >
          Agregar
        </button>
      </div>
    </div>
  );
};

export default Producto;
