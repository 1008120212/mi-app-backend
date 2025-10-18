
const express = require('express');
const router = express.Router();
const Producto = require('../models/producto');

// ✅ Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener productos' });
  }
});

// ✅ Crear un nuevo producto
router.post('/', async (req, res) => {
  try {
    const { nombre, categoria, cantidad, precio } = req.body;
    const nuevo = new Producto({ nombre, categoria, cantidad, precio });
    const guardado = await nuevo.save();
    res.status(201).json(guardado);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear producto' });
  }
});

// ✅ Actualizar producto por ID
router.patch('/:id', async (req, res) => {
  try {
    const actualizado = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(actualizado);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar producto' });
  }
});

// ✅ Eliminar producto por ID
router.delete('/:id', async (req, res) => {
  try {
    await Producto.findByIdAndDelete(req.params.id);
    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar producto' });
  }
});

module.exports = router;

