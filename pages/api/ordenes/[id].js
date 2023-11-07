import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();
  if (req.method === "POST") {
    const { id } = req.query;
    const ordenActualizada = await prisma.orden.update({
      where: {
        id: parseInt(id),
      },
      data: {
        estado: true,
      },
    });
    res.status(200).json(ordenActualizada);
  }

  if (req.method === "GET") {
    const { id } = req.query;
  
   
    const orden = await prisma.orden.findUnique(
    {
      where: {
        id:parseInt(id)
      },
      include:{
        pedido:{
          include:{
            producto:{
              select:{
                id:true,
                nombre:true,
                imagen:true
              }
            
            }
          }
        }
      }
     
      
    }
    )

    res.status(200).json(orden);


  }
}