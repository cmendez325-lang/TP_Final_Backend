import express from 'express';
import { estaAutenticado, esAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Array en memoria con los roles solicitados (admin, vendedor y usuario)
let usuarios = [
  { id: 1, nombre: "Cristian (Admin)", email: "admin@cma.com", rol: "admin" },
  { id: 2, nombre: "Marcos (Vendedor)", email: "vendedor@cma.com", rol: "vendedor" },
  { id: 3, nombre: "Cliente Común", email: "cliente@test.com", rol: "user" }
];

// GET: Listar todos los usuarios
router.get('/', (req, res) => {
  res.json(usuarios);
});

// DELETE: Eliminar un usuario (Protegido: Solo accesible por un Administrador)
router.delete('/:id', estaAutenticado, esAdmin, (req, res) => {
  const { id } = req.params;
  const index = usuarios.findIndex(u => u.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  usuarios.splice(index, 1);

  res.json({ mensaje: "Usuario eliminado con éxito" });
});

// POST: Registrar un nuevo usuario indicando opcionalmente el rol
router.post('/', (req, res) => {
  const { nombre, email, rol } = req.body;

  const nuevoUsuario = {
    id: usuarios.length + 1,
    nombre,
    email,
    rol: rol || "user" // Si no se especifica, por defecto asigna el rol de cliente/usuario común
  };

  usuarios.push(nuevoUsuario);

  res.status(201).json({
    message: "Usuario registrado con éxito",
    usuario: nuevoUsuario
  });
});

// PUT: Cambiar el rol de un usuario (Protegido: Solo accesible por un Administrador)
router.put('/:id/rol', estaAutenticado, esAdmin, (req, res) => {
  const { id } = req.params;
  const { rol } = req.body;

  const usuario = usuarios.find(u => u.id === parseInt(id));
  if (!usuario) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  usuario.rol = rol || usuario.rol;

  res.json({
    message: "¡Rol actualizado con éxito!",
    usuario
  });
});

export default router;