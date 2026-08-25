import express from 'express';
import { estaAutenticado } from '../middlewares/authMiddleware.js';
import { crearOrden, obtenerMisOrdenes } from '../controllers/ordenController.js';

const router = express.Router();

router.post('/', estaAutenticado, crearOrden);
router.get('/', estaAutenticado, obtenerMisOrdenes);

export default router;