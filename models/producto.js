// models/Producto.js
const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  categoria: {
    type: String,
    required: true
  },
  proveedor: {
    type: String,
    default: 'Desconocido'
  },
  ubicacion: {
    type: String,
    default: 'Almacén general'
  },
  cantidad: {
    type: Number,
    required: true,
    min: 0
  },
  minimo: {
    type: Number,
    default: 10
  },
  coste: {
    type: Number,
    default: 0
  },
  precio: {
    type: Number,
    default: 0
  },
  alertaStock: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// ⚙️ Middleware: actualiza alerta automáticamente
productoSchema.pre('save', function (next) {
  this.alertaStock = this.cantidad <= this.minimo;
  next();
});

module.exports = mongoose.model('Producto', productoSchema);
