import express from 'express';
import { getUsers, getUser, create, update, remove, changeRole, getMiPerfil, updateMiPerfil } from '../controllers/userController.js';
import { estaAutenticado, esAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Rutas de "mi perfil" (cualquier usuario logueado, solo sobre sus propios datos)
// IMPORTANTE: van antes de '/:id' para que Express no interprete "perfil" como un ID
router.get('/perfil', estaAutenticado, getMiPerfil);
router.put('/perfil', estaAutenticado, updateMiPerfil);

// GET: Listar todos los usuarios (Solo Administrador)
router.get('/', estaAutenticado, esAdmin, getUsers);

// GET: Obtener un usuario por ID (Solo Administrador)
router.get('/:id', estaAutenticado, esAdmin, getUser);

// POST: Crear un usuario
router.post('/', create);

// PUT: Actualizar datos de un usuario (Solo Administrador)
router.put('/:id', estaAutenticado, esAdmin, update);

// PUT: Cambiar el rol de un usuario (Solo Administrador)
router.put('/:id/rol', estaAutenticado, esAdmin, changeRole);

// DELETE: Eliminar un usuario (Solo Administrador)
router.delete('/:id', estaAutenticado, esAdmin, remove);

export default router;
