// models/Movimiento.js
const mongoose = require('mongoose');
const Producto = require('./producto');

const movimientoSchema = new mongoose.Schema({
  producto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Producto',
    required: true
  },
  tipo: {
    type: String,
    enum: ['ENTRADA', 'SALIDA', 'AJUSTE'],
    required: true
  },
  cantidad: {
    type: Number,
    required: true,
    min: 1
  },
  motivo: {
    type: String,
    default: 'Sin especificar'
  },
  fecha: {
    type: Date,
    default: Date.now
  }
});

//  Middleware para actualizar stock automáticamente
movimientoSchema.post('save', async function () {
  const producto = await Producto.findById(this.producto);
  if (!producto) return;

  if (this.tipo === 'ENTRADA') {
    producto.cantidad += this.cantidad;
  } else if (this.tipo === 'SALIDA') {
    producto.cantidad = Math.max(0, producto.cantidad - this.cantidad);
  }
  producto.alertaStock = producto.cantidad <= producto.minimo;
  await producto.save();
});

module.exports = mongoose.model('Movimiento', movimientoSchema);
