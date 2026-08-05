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
    min: [0, 'El stock no puede ser menor a 0'] 
  },
  categoria: { 
    type: String, 
    required: [true, 'La categoría es obligatoria'],
    trim: true
  },
  imagen: {
    type: String,
    required: false
  },
  vendedorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  }
}, {
  timestamps: true
});

export default mongoose.models.Producto || mongoose.model('Producto', productoSchema);
