import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";
import { formatearDinero } from "@/helpers";
import useQuiosco from "@/hooks/useQuiosco";
import { useRouter } from "next/router";

export default function Orden({ orden }) {
  const router = useRouter();
  const { id, nombre, total, pedido } = orden;
  const { setNroOrden } = useQuiosco();

  const completarOrden = async () => {
    try {
      const data = await axios.post(`/api/ordenes/${id}`);
      toast.success("Orden Lista");
    } catch (error) {
      toast.error("Hubo un error");
    }
  };
  const handleEditarOrden = async () => {
    await setNroOrden(id);
    router.push("/");
  };

  return (
    <div className="grid md:grid-cols-2  gap-2 border-2  border-amber-500  p-2 m-1 h-auto rounded-lg">
      <div className=" bg-amber-100/50 p-1">
      <h3 className="text-2xl font-bold">Orden: {id}</h3>
      <p className="text-lg font-bold">Cliente: {nombre}</p>
        {pedido.map((plato) => (
          <div
            key={plato.id}
            className="py-3 flex border-b-2 border-color: #000 last-of-type:border-0 items-center"
          >
            <div className="w-32">
              <Image
                width={50}
                height={55}
                src={`/assets/img/${plato.producto.imagen}.jpg`}
                alt={`Imagen Plato ${plato.producto.nombre}`}
              />
            </div>
            <div className=" space-y-1">
              <h4 className="text-xl font-bold text-amber-500">
                {plato.producto.nombre}
              </h4>
              <p className="text-lg font-bold">Cantidad: {plato.cantidad}</p>
            </div>
          </div>
        ))}
      </div>
      <div className=" flex flex-col  justify-between">
        <p className=" mb-3 font-black text-4xl text-amber-500 ">
          Total a pagar: {formatearDinero(total)}
        </p>
        <div className=" flex  flex-col gap-1 ">
          <button
            className="bg-amber-400 hover:bg-amber-500 text-white py-1 uppercase font-bold rounded-lg"
            type="submit"
            onClick={completarOrden}
          >
            Pago Contado
          </button>
          <button
            className="bg-amber-400 hover:bg-amber-500 text-white py-1 uppercase font-bold rounded-lg"
            type="submit"
            onClick={completarOrden}
          >
            MercadoPago
          </button>
          <button
            type="button"
            className="bg-amber-400  hover:bg-amber-500 text-white py-1  uppercase font-bold rounded-lg "
            onClick={() => handleEditarOrden()}
          >
            Editar
          </button>
          <button
            type="button"
            className="bg-amber-400  hover:bg-amber-500 text-white py-1 uppercase font-bold rounded-lg "
            onClick={() => handleEditarCantidades(producto.id)}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
