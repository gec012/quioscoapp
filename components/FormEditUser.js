import React, { useState, useEffect } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const FormEditUser = ({ user, onEdit, onCancel }) => {
  const [editedUser, setEditedUser] = useState({
    id: user.id,
    nombre: user.nombre,
    correo: user.correo,
    role: user.role,
  });

  const handleInputChange = (e) => {
    setEditedUser({
      ...editedUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = () => {
    onEdit(editedUser);
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md mt-4">
      <h2 className="text-2xl font-bold mb-4">Editar Usuario</h2>
      <TextField
        label="Nombre"
        name="nombre"
        value={editedUser.nombre}
        onChange={handleInputChange}
        fullWidth
        className="mb-4"
      />
      <TextField
        label="Correo"
        name="correo"
        value={editedUser.correo}
        onChange={handleInputChange}
        fullWidth
        className="mb-4"
      />
      <FormControl fullWidth className="mb-4">
        <InputLabel>Rol</InputLabel>
        <Select
          label="Rol"
          name="role"
          value={editedUser.role}
          onChange={handleInputChange}
        >
          <MenuItem value="ADMIN">ADMIN</MenuItem>
          <MenuItem value="SUPERADMIN">SUPERADMIN</MenuItem>
        </Select>
      </FormControl>
      <div className="flex justify-between mt-2">
        <Button
          variant="contained"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleEdit}
        >
          Guardar cambios
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

export default FormEditUser;
