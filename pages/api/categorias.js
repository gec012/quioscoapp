// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "@/prisma";



export default async function handler(req, res) {
  
  const categorias = await prisma.categoria.findMany({
    include:{
      productos:true,
    },
  });
  prisma.$disconnect();
  res.status(200).json(categorias);
}

