// CustomLogin.js
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";

const Login = () => {
  const [credentials, setCredentials] = useState({
    identifier: "",
    password: "",
  });

  const router = useRouter();
  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      ...credentials,
    });

    // Manejar el resultado de inicio de sesión
    if (!result.error) {
      console.log("Inicio de sesión exitoso:", result);
      // Redirigir o realizar otras acciones después del inicio de sesión exitoso
      router.push("/admin");
    } else {
      console.error("Error en inicio de sesión:", result.error);
    }
  };

  const handleForgotPassword = () => {
    // Redirigir a la página de restablecimiento de contraseña
    router.push("/auth/forgot-password");
  };
  return (
    <div className="container mx-auto mt-8">
      <form className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Inicio de Sesión</h2>
        <div className="mb-4">
          <label
            htmlFor="identifier"
            className="block text-gray-600 text-sm font-medium"
          >
            Correo Electrónico
          </label>
          <input
            type="text"
            id="identifier"
            name="identifier"
            value={credentials.identifier}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-600 text-sm font-medium"
          >
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <button
          type="submit"
          onClick={handleSignIn}
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200"
        >
          Iniciar Sesión
        </button>
        <button
          type="button"
          onClick={handleForgotPassword}
          className="w-full bg-transparent text-blue-500 p-2 rounded-md hover:text-blue-600 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200 mt-4"
        >
          Olvidé mi contraseña
        </button>
      </form>
    </div>
  );
};
export default Login;
