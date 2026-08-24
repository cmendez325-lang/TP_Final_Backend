import mongoose from 'mongoose';

const productoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del producto es obligatorio'],
        trim: true
    },
    precio: {
        type: Number,
        required: [true, 'El precio es obligatorio'],
        min: [0, 'El precio no puede ser negativo']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción es obligatoria']
    },
    stock: {
        type: Number,
        required: [true, 'El stock es obligatorio'],
        default: 0 // Evita que explote si un producto viejo no lo tiene
    },
    imagen: {
        type: String,
        required: false
    },
    categoria: {
        type: String,
        required: false
    },
    destacado: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Producto = mongoose.models.Producto || mongoose.model('Producto', productoSchema);
export default Producto;