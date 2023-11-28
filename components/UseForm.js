import { useState } from "react";
import { TextField, Button, Select, MenuItem,FormControl,InputLabel } from "@mui/material";

const UserForm = ({ onRegister,onCancel }) => {
  const [newUser, setNewUser] = useState({
    nombre: "",
    correo: "",
    password: "",
    confirmPassword:"",
    role: "",
  });

  const handleInputChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = () => {
    onRegister(newUser);
  };
  const handleCancel = () => {
    onCancel();
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md mt-4">
      <h2 className="text-2xl font-bold mb-4">Registrar Nuevo Usuario</h2>
      <TextField
        label="Nombre"
        name="nombre"
        value={newUser.nombre}
        onChange={handleInputChange}
        fullWidth
        className="mb-4"
      />
      <TextField
        label="Correo"
        name="correo"
        value={newUser.correo}
        onChange={handleInputChange}
        fullWidth
        className="mb-4"
      />
      <TextField
        label="Contraseña"
        name="password"
        type="password"
        value={newUser.password}
        onChange={handleInputChange}
        fullWidth
        className="mb-4"
      />
      <TextField
        label="Confirmar Contraseña"
        name="confirmPassword"
        type="password"
        value={newUser.confirmPassword}
        onChange={handleInputChange}
        fullWidth
        className="mb-4"
      />
      <FormControl fullWidth className="mb-4">
        <InputLabel>Rol</InputLabel>
        <Select
          label="Rol"
          name="role"
          value={newUser.role}
          onChange={handleInputChange}
        >
          
          <MenuItem value="ADMIN">ADMIN</MenuItem>
          <MenuItem value="SUPERADMIN">SUPERADMIN</MenuItem>
        </Select>
      </FormControl>
      <div div className="flex justify-between mt-2">
      <Button
        variant="contained"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleRegister}
      >
        Registrar
      </Button>
      <Button
          variant="contained"
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleCancel}
        >
          Cancelar
      </Button>
      </div>
      
    </div>
  );
};

export default UserForm;
