import Orden from '../Models/Orden.js';

export const crearOrden = async (req, res) => {
    try {
        const { productos, total } = req.body;

        if (!productos || !Array.isArray(productos) || productos.length === 0) {
            return res.status(400).json({ mensaje: 'No se enviaron productos para la orden' });
        }

        const productosFormateados = productos.map((item) => ({
            productoId: item._id || item.id,
            nombre: item.nombre,
            precio: item.precio,
            cantidad: item.cantidad
        }));

        const nuevaOrden = await Orden.create({
            usuario: req.usuario.id,
            productos: productosFormateados,
            total
        });

        res.status(201).json({ mensaje: '¡Compra registrada con éxito!', orden: nuevaOrden });
    } catch (error) {
        console.error('Error al crear la orden:', error);
        res.status(500).json({ mensaje: 'Error interno al registrar la compra' });
    }
};

export const obtenerMisOrdenes = async (req, res) => {
    try {
        const ordenes = await Orden.find({ usuario: req.usuario.id }).sort({ createdAt: -1 });
        res.status(200).json(ordenes);
    } catch (error) {
        console.error('Error al obtener órdenes:', error);
        res.status(500).json({ mensaje: 'Error al obtener el historial de compras' });
    }
};