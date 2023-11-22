// pages/api/reset-password/handle.js
import prisma from "@/prisma";
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  const { method, body } = req;

  switch (method) {
    case "POST":
      return handleVerifyToken(body, res);

    case "PUT":
      return handleUpdatePassword(body, res);

    default:
      return res.status(405).end(); // Método no permitido
  }
}

async function handleVerifyToken({ token }, res) {
  try {
    const user = await prisma.user.findFirst({
      where: { resetToken: token },
    });

    if (!user || new Date() > user.resetTokenExpires) {
      return res
        .status(400)
        .json({ success: false, message: "Token inválido o expirado." });
    }

    return res
      .status(200)
      .json({ success: true, message: "Token verificado exitosamente." });
  } catch (error) {
    console.error("Error al verificar el token:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error interno del servidor." });
  } finally {
    await prisma.$disconnect();
  }
}

async function handleUpdatePassword({ token, password }, res) {
  try {
    const user = await prisma.user.findFirst({
      where: { resetToken: token },
    });
    console.log("usuario 2", user);
    if (!user) {
      return res
        .status(404)
        .json({
          success: false,
          message: "No se encontró ningún usuario con ese correo electrónico.",
        });
    }

    // Verifica que el token coincida y no haya expirado (opcional, ya que se supone que se verificó antes)
    if (user.resetToken !== token || new Date() > user.resetTokenExpires) {
      return res
        .status(400)
        .json({ success: false, message: "Token inválido o expirado." });
    }

    // Actualiza la contraseña y el token de restablecimiento
    const hashedPassword = await bcrypt.hash(password, 10)
    await prisma.user.update({
      where: { correo:user.correo },
      data: { password:hashedPassword, resetToken: null, resetTokenExpires: null },
    });

    // Puedes realizar otras operaciones necesarias después de restablecer la contraseña

    return res
      .status(200)
      .json({
        success: true,
        message: "Contraseña restablecida exitosamente.",
      });
  } catch (error) {
    console.error("Error al restablecer la contraseña:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error interno del servidor." });
  } finally {
    await prisma.$disconnect();
  }
}
