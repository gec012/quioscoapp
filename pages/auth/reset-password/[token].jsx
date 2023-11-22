// pages/reset-password/[token].js

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios  from 'axios';



export default function ResetPassword({ token }) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [tokenExpired, setTokenExpired] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkExpiration = async () => {
      try {
        const response = await axios.post('/api/reset-password/handle',{token});
        const { success } = response.data;
        success? setTokenExpired(false):setTokenExpired(true);
     
      } catch (error) {
        console.error('Error al verificar la expiración del token:', error);
        setTokenExpired(true); // Marcar como expirado en caso de error
        setError('Error al verificar la expiración del token. Inténtalo de nuevo.');
      }
    };
  
    checkExpiration();
  }, [token]);

  const handleResetPassword = async () => {
    try {
      if (tokenExpired) {
        setError('El token ha expirado. Solicite un nuevo enlace de restablecimiento.');
        return;
      }

      if (password !== confirmPassword) {
        setError('Las contraseñas no coinciden');
        return;
      }

      // Aquí llamamos a la lógica de la API
      const result = await axios.put('/api/reset-password/handle',{token,password});
      const { success } = result.data;
      if (success) {
        router.push('/auth/login');
      } else {
        setError(result.message);
      }
    } catch (error) {
      console.error('Error al restablecer la contraseña:', error);
      setError('Error al restablecer la contraseña. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white border rounded-md shadow-md">
    <h1 className="text-2xl font-semibold mb-4">Restablecer contraseña</h1>
    {tokenExpired ? (
      <p className="text-red-500">El token ha expirado. Por favor, solicite un nuevo enlace de restablecimiento.</p>
    ) : (
      <>
        <input
          type="password"
          placeholder="Nueva contraseña"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full py-2 px-3 mb-4 border rounded-md"
        />
        <input
          type="password"
          placeholder="Confirmar contraseña"
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full py-2 px-3 mb-4 border rounded-md"
        />
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          onClick={handleResetPassword}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Restablecer contraseña
        </button>
      </>
    )}
  </div>
  
  );
}

// Esta función se ejecuta en el servidor y proporciona las propiedades a la página
export async function getServerSideProps(context) {
  const { token } = context.params;

  if (!token) {
    console.log('aqui salgo');
    return {
      redirect: {
        destination: '/', // Actualiza esto con la ruta a la que quieres redirigir
        permanent: false,
      },
    };
  }

  return {
    props: { token },
  };
}
