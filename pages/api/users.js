import prisma from '@/prisma';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Obtener todos los usuarios
    const users = await prisma.user.findMany();
    await prisma.$disconnect();
    res.status(200).json(users);
  } else if (req.method === 'POST') {
    // Crear un nuevo usuario
    const { nombre, correo, password, confirmPassword, role } = req.body;
     console.log(req.body)
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Las contraseñas no coinciden' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const newUser = await prisma.user.create({
        data: {
          nombre,
          correo,
          password: hashedPassword,
          role,
        },
      });
      await prisma.$disconnect();
      res.status(201).json(newUser);
    } catch (error) {
      console.error('Error al crear el usuario:', error);
      await prisma.$disconnect();
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  } else if (req.method === 'PUT') {
    // Actualizar un usuario existente
    const { id, nombre, correo, role } = req.body;
    console.log(req.body)
     try {
      const updatedUser = await prisma.user.update({
        where: { id },
        data: {
          nombre,
          correo,
          role,
        },
      });
      await prisma.$disconnect();
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
      await prisma.$disconnect();
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  } else if (req.method === 'DELETE') {
     const { id } = req.body;
     console.log('hola',req.body)
    try {
       await prisma.user.delete({
         where: { id },
      });
       await prisma.$disconnect();
      res.status(200).json({ message: 'Usuario eliminado con éxito' });
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
      await prisma.$disconnect();
      res.status(500).json({ error: 'Error interno del servidor' });
    }}
}
