import { useState, useEffect } from 'react';
import axios from 'axios';

const User = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ nombre: '', correo: '', role: 'ADMIN' });
  const [showPassword, setShowPassword] = useState(false);
 


useEffect(() => {
    const timer = setTimeout(() => {
      setShowPassword(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [showPassword]);

  const handleInputChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });

    setShowPassword(true);
  };
 
 
  


  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  };

  useEffect(() => {
    // Definir una función dentro de useEffect para poder utilizar async/await
    const fetchData = async () => {
      await fetchUsers();
    };

    fetchData(); // Llamar a la función dentro de useEffect
  }, []); // Asegurarse de que el segundo argumento sea un array vacío

  const handleRegister = async () => {
    try {
      const response = await axios.post('/api/users', newUser);

      if (response.status === 201) {
        const createdUser = response.data;
        console.log('Usuario creado:', createdUser);
        // Recargar la lista de usuarios después de la creación
        await fetchUsers(); // Asegurarse de que la actualización se realiza después de la creación
      } else {
        console.error('Error al crear el usuario:', response.statusText);
      }
    } catch (error) {
      console.error('Error al crear el usuario:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Lista de Usuarios</h1>
      <ul className="mb-4">
        {users.map((user) => (
          <li key={user.id} className="mb-2">
            {user.nombre} - {user.correo} - {user.role}
          </li>
        ))}
      </ul>
      <div className="bg-white p-6 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4">Registrar Nuevo Usuario</h2>
        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Nombre:</label>
          <input
            type="text"
            name="nombre"
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Correo:</label>
          <input
            type="text"
            name="correo"
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
        <label className="block text-gray-600 mb-2">Contraseña:</label>
        <input
          type={showPassword ? 'text' : 'password'}
          name="password"
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-600 mb-2">Confirmar Contraseña:</label>
        <input
          type={showPassword ? 'text' : 'password'}
          name="confirmPassword"
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md"
        />
      </div>
        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Rol:</label>
          <select
            name="role"
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="ADMIN">ADMIN</option>
            <option value="SUPERADMIN">SUPERADMIN</option>
          </select>
        </div>
        <button
          onClick={handleRegister}
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200"
        >
          Registrar Usuario
        </button>
      </div>
    </div>
  );
};

export default User;
