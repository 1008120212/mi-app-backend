// routes/movimientos.js
const express = require('express');
const router = express.Router();
const Movimiento = require('../models/Movimiento');
const Producto = require('../models/producto');

// Obtener todos los movimientos
router.get('/', async (req, res) => {
  try {
    const movimientos = await Movimiento.find().populate('producto', 'nombre categoria');
    res.json(movimientos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener movimientos', error: error.message });
  }
});

//  Registrar un nuevo movimiento (actualiza stock)
router.post('/', async (req, res) => {
  try {
    const { producto, tipo, cantidad, motivo } = req.body;
    const existe = await Producto.findById(producto);
    if (!existe) return res.status(404).json({ mensaje: 'Producto no encontrado' });

    const movimiento = new Movimiento({ producto, tipo, cantidad, motivo });
    await movimiento.save();

    res.status(201).json({ mensaje: 'Movimiento registrado y stock actualizado', movimiento });
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al registrar movimiento', error: error.message });
  }
});

module.exports = router;
