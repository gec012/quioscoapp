import Head from "next/head";
import Sidebar from "@/components/Sidebar";
import Pasos from "@/components/Pasos";
import Modal from "react-modal";
import { ToastContainer } from "react-toastify";
import useQuiosco from "@/hooks/useQuiosco";
import ModalProducto from "@/components/ModalProducto";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#__next");

export default function Layout({ children, pagina }) {
  const { modal } = useQuiosco();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  return (
    <>
      <Head>
        <title>Cafe - {pagina}</title>
        <meta name="description" content="Cafeteria" />
      </Head>
      <div className="flex w-full   max-md:flex-col">
        <aside className="md:w-/12 lg:w-5/12 xl:w-2/4 2xl:w-2/5 p-1 max-md:border-b-2 md:h-screen  ">
          <Sidebar />
        </aside>
        <main className="">
          <Pasos />
          <div className="p-10 ">{children}</div>
        </main>
      </div>
      {modal && (
        <Modal isOpen={modal} style={customStyles}>
          <ModalProducto />
        </Modal>
      )}
      <ToastContainer />
    </>
  );
}
