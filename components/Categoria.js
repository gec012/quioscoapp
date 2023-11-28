import Image from "next/image";
import useQuiosco from "../hooks/useQuiosco";
const Categoria = ({ categoria }) => {
  const { categoriaActual, handleClickCategoria } = useQuiosco();
  const { nombre, icono, id } = categoria;

  return (
    <div
      className={`${
        categoriaActual?.id === id ? "bg-amber-400" : ""
      }  border-b-2 border-gray p-5 hover:bg-amber-400`}
    >
      <button
        type="button"
        className="text-2x1 font-bold hover:cursor-pointer"
        onClick={() => handleClickCategoria(id)}
      >
        {nombre}
      </button>
    </div>
  );
};

export default Categoria;
