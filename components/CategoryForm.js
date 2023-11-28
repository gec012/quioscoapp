import { useForm } from "react-hook-form";
import { TextField, Button, Box } from "@mui/material";

function CategoryForm({ onSubmit, onCancel }) {
  const { register, handleSubmit, reset } = useForm();

  const submitHandler = (data) => {
    onSubmit(data);
    reset();
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md mt-4">
      <h2 className="text-2xl font-bold mb-4">Registrar Nueva Categoria</h2>
      <form onSubmit={handleSubmit(submitHandler)}>
        <Box mb={2}>
          <TextField
            {...register("nombre")}
            label="Nombre de la categoría"
            variant="outlined"
            fullWidth
          />
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Button 
          type="submit" 
          variant="contained" 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Crear
          </Button>
          <Button 
          type="button" 
          variant="contained"
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" 
          onClick={onCancel}>
            Cancelar
          </Button>
        </Box>
      </form>
    </div>
  );
}

export default CategoryForm;
