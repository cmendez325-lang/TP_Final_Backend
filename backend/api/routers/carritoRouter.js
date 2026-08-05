import express from 'express';
import { estaAutenticado } from '../middlewares/authMiddleware.js';
import { 
  obtenerCarrito, 
  agregarOActualizarCarrito, 
  vaciarCarrito 
} from '../controllers/carritoController.js'; 

const router = express.Router();

// Rutas que llaman al controlador
router.get('/', estaAutenticado, obtenerCarrito);
router.post('/', estaAutenticado, agregarOActualizarCarrito);
router.delete('/', estaAutenticado, vaciarCarrito);

export default router;