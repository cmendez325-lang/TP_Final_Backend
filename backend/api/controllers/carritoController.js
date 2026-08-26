import Carrito from '../models/Carrito.js';
import Producto from '../models/Producto.js';

// Controlador para ver el carrito
export const obtenerCarrito = async (req, res, next) => {
  try {
    const usuarioId = req.headers['x-user-id'] || 'default_user';
    let carrito = await Carrito.findOne({ usuarioId }).populate('productos.productoId');
    
    if (!carrito) {
      return res.json({ productos: [], total: 0 });
    }
    
    return res.json(carrito);
  } catch (error) {
    next(error);
  }
};

// Controlador para agregar o actualizar un producto en el carrito
export const agregarOActualizarCarrito = async (req, res, next) => {
  try {
    const { productoId, cantidad } = req.body;
    const usuarioId = req.headers['x-user-id'] || 'default_user';

    const producto = await Producto.findById(productoId);
    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    // Validación general de stock inicial
    if (producto.stock < cantidad) {
      return res.status(400).json({ error: `Stock insuficiente. Solo hay ${producto.stock} unidades disponibles.` });
    }

    let carrito = await Carrito.findOne({ usuarioId });

    if (!carrito) {
      carrito = new Carrito({
        usuarioId,
        productos: [{ productoId, cantidad }]
      });
    } else {
      const index = carrito.productos.findIndex(p => p.productoId.toString() === productoId);
      
      if (index > -1) {
        
        if (producto.stock < cantidad) {
          return res.status(400).json({ error: `Stock insuficiente. Solo hay ${producto.stock} unidades disponibles.` });
        }
        carrito.productos[index].cantidad = cantidad;
      } else {
        carrito.productos.push({ productoId, cantidad });
      }
    }

    await carrito.save();
    return res.json({ message: "¡Carrito actualizado con éxito!", carrito });
  } catch (error) {
    next(error);
  }
};

// Controlador para vaciar el carrito
export const vaciarCarrito = async (req, res, next) => {
  try {
    const usuarioId = req.headers['x-user-id'] || 'default_user';
    await Carrito.findOneAndDelete({ usuarioId });
    return res.json({ message: "El carrito ha sido vaciado." });
  } catch (error) {
    next(error);
  }
};