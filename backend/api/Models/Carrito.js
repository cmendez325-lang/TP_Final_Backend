import mongoose from 'mongoose';

const carritoSchema = new mongoose.Schema({
  usuarioId: { 
    type: String, // O ObjectId si manejas una colección de usuarios
    required: true, 
    unique: true 
  },
  productos: [
    {
      productoId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Producto', 
        required: true 
      },
      cantidad: { 
        type: Number, 
        required: true, 
        min: 1 
      }
    }
  ],
  total: { 
    type: Number, 
    default: 0 
  }
}, { timestamps: true });

export default mongoose.model('Carrito', carritoSchema);