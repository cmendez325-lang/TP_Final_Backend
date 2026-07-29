import Producto from '../Models/Producto.js'; // Tu modelo de Mongoose

export default async function getOneProducto(req, res) {
    try {
        const { id } = req.params;

        // Búsqueda directa en MongoDB usando Mongoose
        const productoEncontrado = await Producto.findById(id);

        if (!productoEncontrado) {
            return res.status(404).json({ mensaje: "Producto no encontrado en la base de datos" });
        }

        return res.status(200).json(productoEncontrado);

    } catch (error) {
        return res.status(500).json({ mensaje: "Error al buscar el producto", error: error.message });
    }
}