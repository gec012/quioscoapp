// utils/api.js
import transporter from '@/utils/nodemailer';
import { v4 as uuidv4 } from 'uuid';


export const generateUniqueToken = () => {
  return uuidv4();
};

export const sendResetEmail = async(email, resetToken) => {
  
  try {
    await transporter.sendMail({
      from: 'mensaje enviado por <gastoncori@gmail.com>', // sender address
      to: email, // list of receivers
      subject: `Restablecimiento de contraseña`, // Subject line
      text: `Haz clic en el siguiente enlace para restablecer tu contraseña: http://localhost:3000/auth/reset-password//${resetToken}`, // plain text body
      
    })
    return  res.status(200).json({ success: true, message: 'Correo electrónico enviado exitosamente.' });
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false, message: 'Error interno del servidor.' });
  }
  
};


