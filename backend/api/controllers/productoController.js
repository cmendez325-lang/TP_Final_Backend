import createProduct from "../Services/Productos/createProduct.js";
import getAllProducts from "../Services/Productos/getAllProducts.js";
import getOneProduct from "../Services/Productos/getOneProduct.js";
import updateProduct from "../Services/Productos/updateProduct.js";
import deleteProduct from "../Services/Productos/deleteProduct.js";
import Producto from '../Models/Producto.js';

// GET: Listar todos los productos
export async function getProducts(req, res) {
    try {
        const productos = await getAllProducts();
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener los productos", error: error.message });
    }
}

// GET: Obtener un producto por ID
export async function getProduct(req, res) {
    try {
        const producto = await getOneProduct(req.params.id);
        if (!producto) {
            return res.status(404).json({ mensaje: "Producto no encontrado" });
        }
        res.status(200).json(producto);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener el producto", error: error.message });
    }
}

// POST: Crear un producto (queda asociado al usuario que lo crea)
export async function create(req, res) {
    try {
        const datosProducto = {
            ...req.body,
            vendedorId: req.usuario.id,
        };

        // Si se subió una imagen, guardamos la URL completa para acceder a ella
        if (req.file) {
            datosProducto.imagen = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
        }

        const nuevoProducto = await createProduct(datosProducto);
        res.status(201).json(nuevoProducto);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ mensaje: "Error de validación", error: error.message });
        }
        res.status(500).json({ mensaje: "Error al crear el producto", error: error.message });
    }
}

// PUT: Actualizar un producto (solo el dueño o un admin)
export async function update(req, res) {
    try {
        const producto = await getOneProduct(req.params.id);
        if (!producto) {
            return res.status(404).json({ mensaje: "Producto no encontrado para actualizar" });
        }

        const esDueño = producto.vendedorId && producto.vendedorId.toString() === req.usuario.id;
        const esAdmin = req.usuario.rol === 'admin';

        if (!esDueño && !esAdmin) {
            return res.status(403).json({ mensaje: "No podés editar un producto que no te pertenece." });
        }

        const datosActualizados = { ...req.body };

        // Si se subió una imagen nueva, reemplazamos la anterior
        if (req.file) {
            datosActualizados.imagen = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
        }

        const productoActualizado = await updateProduct(req.params.id, datosActualizados);
        res.status(200).json(productoActualizado);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar el producto", error: error.message });
    }
}

// DELETE: Eliminar un producto (solo el dueño o un admin)
export async function remove(req, res) {
    try {
        const producto = await getOneProduct(req.params.id);
        if (!producto) {
            return res.status(404).json({ mensaje: "Producto no encontrado para eliminar" });
        }

        const esDueño = producto.vendedorId && producto.vendedorId.toString() === req.usuario.id;
        const esAdmin = req.usuario.rol === 'admin';

        if (!esDueño && !esAdmin) {
            return res.status(403).json({ mensaje: "No podés eliminar un producto que no te pertenece." });
        }

        await deleteProduct(req.params.id);
        res.status(200).json({ mensaje: "Producto eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar el producto", error: error.message });
    }
}
export const actualizarStock = async (req, res) => {
    try {
        const { itemsCarrito } = req.body;

        if (!itemsCarrito || !Array.isArray(itemsCarrito)) {
            return res.status(400).json({ error: 'No se enviaron los ítems del carrito' });
        }

        for (const item of itemsCarrito) {
            const productoId = item._id || item.id;
            const cantidadComprada = item.cantidad || 1;

            // Resta la cantidad comprada al stock actual en MongoDB
            await Producto.findByIdAndUpdate(productoId, {
                $inc: { stock: -cantidadComprada }
            });
        }

        res.status(200).json({ mensaje: 'Stock actualizado con éxito en la base de datos' });
    } catch (error) {
        console.error('Error al actualizar el stock:', error);
        res.status(500).json({ error: 'Error interno al procesar el stock' });
    }
};