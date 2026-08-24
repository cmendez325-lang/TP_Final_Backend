import express from 'express';
import { getProducts, getProduct, create, update, remove, actualizarStock } from '../controllers/productoController.js';
import { estaAutenticado, verificarVendedorOAdmin } from '../middlewares/authMiddleware.js';
import upload from '../middlewares/uploadMiddleware.js';

const router = express.Router();

// Rutas públicas
router.get('/', getProducts);
router.put('/actualizar-stock', actualizarStock); 
router.get('/:id', getProduct);

// Rutas protegidas
router.post('/', estaAutenticado, verificarVendedorOAdmin, upload.single('imagen'), create);
router.put('/:id', estaAutenticado, verificarVendedorOAdmin, upload.single('imagen'), update);
router.delete('/:id', estaAutenticado, verificarVendedorOAdmin, remove);

export default router;