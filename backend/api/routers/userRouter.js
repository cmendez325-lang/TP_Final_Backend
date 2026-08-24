import express from 'express';
import { getUsers, getUser, create, update, remove, changeRole, getMiPerfil, updateMiPerfil } from '../controllers/userController.js';
import { estaAutenticado, esAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/perfil', estaAutenticado, getMiPerfil);
router.put('/perfil', estaAutenticado, updateMiPerfil);

router.get('/', estaAutenticado, esAdmin, getUsers);

router.get('/:id', estaAutenticado, esAdmin, getUser);

router.post('/', create);

router.put('/:id', estaAutenticado, esAdmin, update);

router.put('/:id/rol', estaAutenticado, esAdmin, changeRole);

router.delete('/:id', estaAutenticado, esAdmin, remove);

export default router;
