// Importa el cliente de Prisma
import prisma from "@/prisma";

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      // Controlador para obtener todas las categorías
      const categorias = await prisma.categoria.findMany({
        include: {
          productos: true,
        },
      });
      prisma.$disconnect();
      res.status(200).json(categorias);
      break;
    case 'POST':
      // Controlador para crear una nueva categoría
      console.log(req.body);
      const newCategory = await prisma.categoria.create({
        data: {
          nombre: req.body.nombre,
        },
      });
      prisma.$disconnect();
      res.status(201).json(newCategory);
      break;
    case 'PUT':
      // Controlador para actualizar una categoría existente
      const updatedCategory = await prisma.categoria.update({
        where: { id: req.body.id },
        data: {
          nombre: req.body.nombre
        },
      });
      prisma.$disconnect();
      res.status(200).json(updatedCategory);
      break;
    case 'DELETE':
      // Controlador para eliminar una categoría existente
      const deletedCategory = await prisma.categoria.delete({
        where: { id: req.body.id },
      });
      prisma.$disconnect();
      res.status(200).json(deletedCategory);
      break;
    default:
      res.status(405).json({ message: 'Metodo no permitido' });
  }
}
