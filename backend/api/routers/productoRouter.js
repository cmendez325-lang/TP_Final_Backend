import express from 'express';
import { getProducts, getProduct, create, update, remove } from '../controllers/productoController.js';
import { estaAutenticado, verificarVendedorOAdmin } from '../middlewares/authMiddleware.js';
import upload from '../middlewares/uploadMiddleware.js';

const router = express.Router();

// Rutas públicas
router.get('/', getProducts);
router.get('/:id', getProduct);

// Rutas protegidas (Solo admin o vendedor). upload.single('imagen') procesa el archivo antes del controller.
router.post('/', estaAutenticado, verificarVendedorOAdmin, upload.single('imagen'), create);
router.put('/:id', estaAutenticado, verificarVendedorOAdmin, upload.single('imagen'), update);
router.delete('/:id', estaAutenticado, verificarVendedorOAdmin, remove);

export default router;
