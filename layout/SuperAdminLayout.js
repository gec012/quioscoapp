import Head from "next/head";
import Image from "next/image";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

function SuperAdminLayout({ children, pagina }) {
  return (
    <>
      <Head>
        <title>Café - {pagina}</title>
        <meta name="description" content="Quiosco Cafetería" />
      </Head>

      <div className="md:flex  flex-grow flex-wrap">
        <aside className=" xl:w-1/4 2xl:w-1/5 py-5 mb-2">
          <Image
            width={300}
            height={100}
            src="/assets/img/logo.svg"
            alt="imagen logotipo"
          />

          <ul className="">
            <li>
              <Link href="/superadmin">
                <button className="w-full border-b-2 p-5 hover:bg-amber-400 font-bold hover:cursor-pointer">
                  Ordenes
                </button>
              </Link>
            </li>
            <li>
              <Link href="/superadmin/users">
                <button className="w-full  border-b-2 p-5 hover:bg-amber-400 font-bold hover:cursor-pointer">
                  Usuarios
                </button>
              </Link>
            </li>
            <li>
              <Link href="/superadmin/usuarios">
                <button className="w-full border-b-2 p-5 hover:bg-amber-400 font-bold hover:cursor-pointer">
                  Administracion de Ordenes
                </button>
              </Link>
            </li>
            <li>
              <Link href="/superadmin/categories">
                <button className="w-full border-b-2 b p-5 hover:bg-amber-400 font-bold hover:cursor-pointer">
                  Administracion de Categorias
                </button>
              </Link>
            </li>
            <li>
              <Link href="/superadmin/usuarios">
                <button className="w-full border-b-2 p-5 hover:bg-amber-400 font-bold hover:cursor-pointer">
                  Administracion de Productos
                </button>
              </Link>
            </li>
          </ul>
        </aside>

        <main className="md:w-8/12 xl:w-3/4 2xl:w-4/5 h-screen overflow-y-scroll">
          <div className="p-10">{children}</div>
        </main>
      </div>
      <ToastContainer />
    </>
  );
}

export default SuperAdminLayout;