const mongoose = require('mongoose');

// Categorías fijas del sistema
const categoriasValidas = [
  'Bebidas',
  'Alimentos',
  'Conservas',
  'Snacks',
  'Lácteos',
  'Aseo',
  'Otros'
];

const productoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  categoria: {
    type: String,
    enum: categoriasValidas, // Solo puede elegir de esta lista
    required: true
  },
  proveedor: {
    type: String,
    default: 'No especificado'
  },
  ubicacion: {
    type: String,
    default: 'Almacén principal'
  },
  cantidad: {
    type: Number,
    default: 0
  },
  minimo: {
    type: Number,
    default: 5
  },
  coste: {
    type: Number,
    default: 0
  },
  precio: {
    type: Number,
    default: 0
  },
  habilitado: {
    type: Boolean,
    default: true // se puede deshabilitar si está en bajo stock
  },
  fechaRegistro: {
    type: Date,
    default: Date.now // se agrega automáticamente
  }
});

// Campo virtual para verificar stock bajo
productoSchema.virtual('alertaStock').get(function() {
  return this.cantidad <= this.minimo;
});

module.exports = mongoose.model('Producto', productoSchema);
