import useSWR from "swr"
import axios from "axios"
import AdminLayout from "@/layout/AdminLayout"
import Orden from "@/components/Orden"


export default function Admin(){
    
    const fetcher =()=> axios('/api/ordenes').then(datos => datos.data)
    const {data,error,isLoading} = useSWR('/api/ordenes',fetcher,{refreshInterval:100})
     //console.log(data)
    // console.log(error)
    // console.log(isLoading)
    return(
       <>
       <AdminLayout pagina="Admin">
       <h1 className="text-4xl font-black">Panel de Administracion</h1>
       <p className="text-2xl my-10">Administrar las ordenes</p>
        <div className="grid gap-4 grid-rows-2 md:grid-rows-3 xl:grid-rows-3 2xl:grid-rows-3">
      
           {data && data.length>0 ? data.map(orden =>
              <Orden
              key={orden.id}
              orden={orden}
             />
           
           ): <p>No hay ordenes pendientes</p>}
        </div>
        
          
       </AdminLayout>
       </>

    )
}