// pages/forgot-password.js
import { useState } from 'react';
import  axios  from 'axios';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleForgotPassword = async () => {
    try {
      const response = await axios.post('/api/reset-password/request', { email });
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error al solicitar el restablecimiento de contraseña:', error);
      setMessage('Error al solicitar el restablecimiento de contraseña. Por favor, inténtalo de nuevo.');
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-md shadow-md">
        <h1 className="text-2xl font-semibold mb-4">Solicitar restablecimiento de contraseña</h1>
        <p className="text-gray-600 mb-4">
          Ingrese su dirección de correo electrónico y le enviaremos un enlace para restablecer su contraseña.
        </p>
        <input
          type="email"
          placeholder="Correo electrónico"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          onClick={handleForgotPassword}
        >
          Enviar enlace de restablecimiento
        </button>
        {message && <p className="mt-4 text-sm text-gray-600">{message}</p>}
      </div>
    </div>
  );
}
