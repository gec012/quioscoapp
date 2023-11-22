// utils/passwordUtils.js
import prisma from '@/prisma';




export const requestPasswordReset = async (email) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return { success: false, message: 'No se encontró ningún usuario con ese correo electrónico.' };
    }

    const resetToken = generateUniqueToken();
    await prisma.user.update({
      where: { email },
      data: { resetToken, resetTokenExpires: new Date(Date.now() + 3600000) },
    });

    sendResetEmail(email, resetToken);

    return { success: true, message: 'Se ha enviado un correo electrónico con las instrucciones para restablecer la contraseña.' };
  } catch (error) {
    console.error('Error al solicitar el restablecimiento de contraseña:', error);
    return { success: false, message: 'Error al solicitar el restablecimiento de contraseña. Por favor, inténtalo de nuevo.' };
  } finally {
    await prisma.$disconnect();
  }
};
