import prisma from "@/prisma";



export default async function handler(req, res) {

  const productos = await prisma.productos.findMany();
  await prisma.$disconnect();
  res.status(200).json(productos);
}

