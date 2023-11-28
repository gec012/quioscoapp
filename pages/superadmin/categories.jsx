import SuperAdminLayout from "@/layout/SuperAdminLayout";
import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card,
  Button,
  IconButton,
} from "@mui/material";
import { Edit, Delete, Category } from "@mui/icons-material";

import CategoryForm from "@/components/CategoryForm";

export default function categories() {
  const [categories, SetCategories] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const fetchCategories = async () => {
    try {
      const response = await axios.get("/api/categorias");
      SetCategories(response.data);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchCategories();
    };
    fetchData();
  }, []);
  const handleRegister = async (data) => {
    try {
      // Enviar los datos del formulario a tu API para crear una nueva categoría
      const response = await axios.post('/api/categorias', { nombre: data.nombre });
  
      // Si la creación fue exitosa, actualizar el estado de las categorías
      if (response.status === 201) {
        fetchCategories();
      }
    } catch (error) {
      console.error('Error al registrar la categoría:', error);
    }
  };
  
  return (
    <SuperAdminLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Lista de Categorias</h1>
        <Button
          variant="contained"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-4 rounded"
          onClick={() => setIsFormVisible(true)}
        >
          Agregar Categoria
        </Button>

        <TableContainer component={Card}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
             
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>{category.nombre}</TableCell>
                
                  <TableCell>
                    <IconButton
                    //   onClick={() => handleEdit(category.id)}
                      color="primary"
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                    //   onClick={() => handleDelete(user.id)}
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

        {/* <ModalDelete
          open={!!deleteUserId}
          onClose={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        /> */}
        {isFormVisible && (
          <CategoryForm
            onSubmit={handleRegister}
            onCancel={() => setIsFormVisible(false)}
          />
        )}
        {/* {isEditFormVisible && (
          <FormEdit
            user={editedUser}
            onEdit={(editedUser) => handleEditSubmit(editedUser)}
            onCancel={() => setIsEditFormVisible(false)}
          />
        )} */}
      </div>
    </SuperAdminLayout>
  );
}
