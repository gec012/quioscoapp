import { Modal, Button, Typography, Box } from '@mui/material';

const ModalDelete = ({ open, onClose, onConfirm }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Typography variant="h6" component="div">
          Confirmar Eliminación
        </Typography>
        <Typography variant="body2" sx={{ mt: 2 }}>
          ¿Estás seguro de que deseas eliminar este usuario?
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Button onClick={onClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={onConfirm} color="error">
            Eliminar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalDelete;