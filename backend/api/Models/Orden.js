import mongoose from 'mongoose';

const ordenSchema = new mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    productos: [
        {
            productoId: { type: String, required: true },
            nombre: { type: String, required: true },
            precio: { type: Number, required: true },
            cantidad: { type: Number, required: true }
        }
    ],
    total: {
        type: Number,
        required: true
    },
    estado: {
        type: String,
        enum: ['pendiente', 'completada', 'cancelada'],
        default: 'completada'
    }
}, {
    timestamps: true
});

const Orden = mongoose.models.Orden || mongoose.model('Orden', ordenSchema);
export default Orden;