import { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";

import { AddCircleOutline, Edit, Delete } from "@mui/icons-material";
import UserForm from "@/components/UseForm";
import FormEdit from "@/components/FormEdit";
import ModalDelete from "@/components/ModalDelete";

const User = () => {
  const [users, setUsers] = useState([]);

  const [showPassword, setShowPassword] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editedUser, setEditedUser] = useState({});
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null)
  

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPassword(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [showPassword]);

 

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchUsers();
    };

    fetchData();
  }, []);

  const handleRegister = async (newUser) => {
    try {
      const response = await axios.post("/api/users", newUser);

      if (response.status === 201) {
        const createdUser = response.data;
        console.log("Usuario creado:", createdUser);
        setIsFormVisible(false); // Oculta el formulario
        await fetchUsers();
      } else {
        console.error("Error al crear el usuario:", response.statusText);
      }
    } catch (error) {
      console.error("Error al crear el usuario:", error);
    }
  };

  const handleEdit = (userId) => {
    const userToEdit = users.find((user) => user.id === userId);
    setEditedUser(userToEdit);
    setIsEditFormVisible(true);
  };
  const handleEditSubmit = async (editedUser) => {
    try {
      const response = await axios.put(`/api/users`, editedUser);

      if (response.status === 200) {
        console.log('Usuario actualizado con éxito.');
        setIsEditFormVisible(false);
        await fetchUsers();
      } else {
        console.error('Error al actualizar el usuario:', response.statusText);
      }
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
    }
  };

  const handleDelete = (userId) => {
    setDeleteUserId(userId);
  };

  const handleConfirmDelete = async () => {
    
    if (deleteUserId) {
      try {
        console.log('aqui entre',deleteUserId)
        const response = await axios.delete('/api/users', { data: { id: deleteUserId } });

        if (response.status === 200) {
          console.log('Usuario eliminado con éxito.');
          await fetchUsers();
        } else {
          console.error('Error al eliminar el usuario:', response.statusText);
        }
      } catch (error) {
        console.error('Error al eliminar el usuario:', error);
      } finally {
        setDeleteUserId(null);
      }
    }
  };

  const handleCancelDelete = () => {
    setDeleteUserId(null);
  };


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Lista de Usuarios</h1>
      <Button
        variant="contained"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setIsFormVisible(true)}
      >
        Agregar usuario
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Correo</TableCell>
              <TableCell>Rol</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.nombre}</TableCell>
                <TableCell>{user.correo}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleEdit(user.id)}
                    color="primary"
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(user.id)}
                    color="secondary"
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ModalDelete
        open={!!deleteUserId}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
      {isFormVisible && <UserForm onRegister={handleRegister} />}
      {isEditFormVisible && (
         <FormEdit
         user={editedUser}
         onEdit={(editedUser) => handleEditSubmit(editedUser)}
         onCancel={() => setIsEditFormVisible(false)}
       />
      )}
      
    </div>
  );
};

export default User;
