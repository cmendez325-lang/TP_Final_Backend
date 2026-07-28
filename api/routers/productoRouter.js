import express from 'express';
import Carrito from '../models/Carrito.js';
import Producto from '../models/Producto.js';
import { estaAutenticado } from '../middlewares/authMiddleware.js';

const router = express.Router();

// GET: Ver el carrito del usuario (Basado en un header de identificación o rol)
router.get('/', estaAutenticado, async (req, res, next) => {
  try {
    const usuarioId = req.headers['x-user-id'] || 'default_user'; // O tu lógica de autenticación
    let carrito = await Carrito.findOne({ usuarioId }).populate('productos.productoId');
    
    if (!carrito) {
      return res.json({ productos: [], total: 0 });
    }
    
    return res.json(carrito);
  } catch (error) {
    next(error);
  }
});

// POST: Agregar o actualizar un producto en el carrito
router.post('/', estaAutenticado, async (req, res, next) => {
  try {
    const { productoId, cantidad } = req.body;
    const usuarioId = req.headers['x-user-id'] || 'default_user';

    // 1. Verificar si el producto existe y tiene stock
    const producto = await Producto.findById(productoId);
    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    if (producto.stock < cantidad) {
      return res.status(400).json({ error: "Stock insuficiente para la cantidad solicitada" });
    }

    // 2. Buscar si el usuario ya tiene un carrito activo
    let carrito = await Carrito.findOne({ usuarioId });

    if (!carrito) {
      // Si no existe, creamos uno nuevo
      carrito = new Carrito({
        usuarioId,
        productos: [{ productoId, cantidad }]
      });
    } else {
      // Si existe, revisamos si el producto ya está en el carrito
      const index = carrito.productos.findIndex(p => p.productoId.toString() === productoId);
      
      if (index > -1) {
        // Actualizamos la cantidad si ya existe
        carrito.productos[index].cantidad = cantidad;
      } else {
        // Agregamos el nuevo producto
        carrito.productos.push({ productoId, cantidad });
      }
    }

    // 3. Opcional: Recalcular el total sumando precios (requiere popular o calcular con datos)
    await carrito.save();
    
    return res.json({ message: "¡Carrito actualizado con éxito!", carrito });
  } catch (error) {
    next(error);
  }
});

// DELETE: Vaciar el carrito
router.delete('/', estaAutenticado, async (req, res, next) => {
  try {
    const usuarioId = req.headers['x-user-id'] || 'default_user';
    await Carrito.findOneAndDelete({ usuarioId });
    return res.json({ message: "El carrito ha sido vaciado." });
  } catch (error) {
    next(error);
  }
});

export default router;