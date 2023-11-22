// pages/api/reset-password/request.js
import { PrismaClient } from '@prisma/client';
import { generateUniqueToken, sendResetEmail } from '@/utils/api';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Método no permitido
  }

  const { email } = req.body;
  console.log(req.body)
  try {
    const user = await prisma.user.findUnique({
      where:  { correo: email }
    });
 console.log('user',user);
    if (!user) {
      return res.status(404).json({ success: false, message: 'No se encontró ningún usuario con ese correo electrónico.' });
    }

    const resetToken = generateUniqueToken();
    await prisma.user.update({
      where: { correo: email },
      data: { resetToken, resetTokenExpires: new Date(Date.now() + 1800000) },
    });

    sendResetEmail(email, resetToken);

    return res.status(200).json({ success: true, message: 'Se ha enviado un correo electrónico con las instrucciones para restablecer la contraseña.' });
  } catch (error) {
    console.error('Error al solicitar el restablecimiento de contraseña:', error);
    return res.status(500).json({ success: false, message: 'Error al solicitar el restablecimiento de contraseña. Por favor, inténtalo de nuevo.' });
  } finally {
    await prisma.$disconnect();
  }
}
