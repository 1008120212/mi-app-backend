const mongoose = require('mongoose');

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
    enum: categoriasValidas,
    required: true
  },
  proveedor: {
    type: String,
    default: 'No especificado'
  },
  cantidad: {
    type: Number,
    default: 0
  },
  minimo: {
    type: Number,
    default: 10,
    immutable: true // no se puede cambiar
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
    default: true
  },
  fechaRegistro: {
    type: Date,
    default: Date.now
  }
});

// Deshabilitar producto automáticamente si alcanza el mínimo
productoSchema.pre('save', function(next) {
  if (this.cantidad <= this.minimo) {
    this.habilitado = false;
  } else {
    this.habilitado = true;
  }
  next();
});

module.exports = mongoose.model('Producto', productoSchema);
