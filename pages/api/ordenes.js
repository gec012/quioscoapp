import prisma from "@/prisma";

 export default async function handler(req, res) {

 
 
 //obtener ordenes
  if(req.method === "GET"){
  const ordenes = await prisma.orden.findMany({
    where: {
      estado: false,
    },
    include: {
       pedido: { include: { producto: true } },
        
    
    },
  });
  await prisma.$disconnect()
  res.status(200).json(ordenes);
  }


  //crear ordenes
  if (req.method === "POST") {
    
    const orden = await prisma.orden.create({
      data: {
        nombre: req.body.nombre,
        total: req.body.total,
        fecha: req.body.fecha,
      },
    });
    // console.log('aqui',req.body.pedido) ;
    req.body.pedido.map(async(producto) => {
      
       await prisma.pedido.create({
        data: {
          productoId: producto.id,
          ordenId: orden.id,
          cantidad: producto.cantidad,
          precio: producto.precio,
        },
      });
    });
    await prisma.$disconnect()
    res.status(200).json(orden);
  }
}
