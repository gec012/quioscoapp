import { useSession, signIn, signOut } from "next-auth/react"
import useSWR from "swr"
import axios from "axios"
import SuperAdminLayout from "@/layout/SuperAdminLayout"
import Orden from "@/components/Orden"
import { useRouter } from "next/router"

export default function SuperAdmin(){
    const fetcher =()=> axios('/api/ordenes').then(datos => datos.data)
    const {data,error,isLoading} = useSWR('/api/ordenes',fetcher,{refreshInterval:100})

    return(
       <>
       <SuperAdminLayout pagina="SuperAdmin">
         <div className="flex justify-between" >
           <h1 className="text-4xl font-black">Panel de SuperAdmin</h1>
           <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700" onClick={() => signOut()}>Cerrar sesión</button>
         </div>
       
       <p className="text-2xl my-10">Administrar las ordenes</p>
        <div className="grid gap-4 grid-rows-2 md:grid-rows-3 xl:grid-rows-3 2xl:grid-rows-3">
           {data && data.length>0 ? data?.map(orden =>
              <Orden
              key={orden.id}
              orden={orden}
             />
           ): <p>No hay ordenes pendientes</p>}
        </div>
        {/* Botón de cierre de sesión */}
        
       </SuperAdminLayout>
       </>
    )
}
