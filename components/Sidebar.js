import Image from "next/image";
import useQuiosco from "@/hooks/useQuiosco";
import Categoria from "@/components/Categoria";
import { faXmark, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const Sidebar = () => {
  const { categorias } = useQuiosco();

  const [open, setOpen] = useState();
  return (
    <>
      <div className="max-md:flex flex-wrap justify-between  ">
        
        <Image
          width={300}
          height={100}
          src="/assets/img/logo.svg"
          alt="imagen logotipo"
          className=" max-md:w-14 max-md:p-0 items-center my-auto"
        />
        <div
          onClick={() => setOpen(!open)}
          className="text-3xl  p-0  cursor-pointer my-auto md:hidden "
        >
          {open ? (
            <FontAwesomeIcon icon={faXmark} />
          ) : (
            <FontAwesomeIcon icon={faBars} />
          )}
        </div>
        <nav
          className={` mt-6 pb-0  max-md:absolute max-md:w-full max-md:bg-amber-100 left-0 pl-0 transition-all duration-500 ease-in ${
            open ? "top-9" : "max-md:top-[-640px]"
          }  `}
        >
          {categorias.map((categoria) => (
            <Categoria key={categoria.id} categoria={categoria} />
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
