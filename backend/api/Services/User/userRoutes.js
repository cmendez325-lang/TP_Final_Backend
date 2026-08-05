import express from 'express';
import { getUsers, changeUserRole, removeUser } from '../controllers/userController.js';
import { estaAutenticado, esAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Todas las rutas de usuarios requieren estar logueado y ser admin
router.get('/', estaAutenticado, esAdmin, getUsers);
router.put('/:id/rol', estaAutenticado, esAdmin, changeUserRole);
router.delete('/:id', estaAutenticado, esAdmin, removeUser);

export default router;
