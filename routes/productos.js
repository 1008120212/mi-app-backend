const express = require('express');
const router = express.Router();
const Producto = require('../models/producto');

// Crear producto
router.post('/', async (req, res) => {
  try {
    const producto = new Producto(req.body);
    await producto.save();
    res.status(201).json(producto);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear producto', error });
  }
});

// Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener productos', error });
  }
});

// Filtrar por categoría
router.get('/categoria/:categoria', async (req, res) => {
  try {
    const productos = await Producto.find({ categoria: req.params.categoria });
    res.json(productos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al filtrar productos', error });
  }
});

// Actualizar stock
router.put('/stock/:id', async (req, res) => {
  try {
    const { cantidad } = req.body;
    const producto = await Producto.findById(req.params.id);
    if (!producto) return res.status(404).json({ mensaje: 'Producto no encontrado' });

    producto.cantidad += cantidad;
    if (producto.cantidad < 0) producto.cantidad = 0;

    await producto.save();
    res.json({ mensaje: 'Stock actualizado', producto });
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al actualizar stock', error });
  }
});

// Habilitar/Deshabilitar
router.put('/estado/:id', async (req, res) => {
  try {
    const { habilitado } = req.body;
    const producto = await Producto.findByIdAndUpdate(req.params.id, { habilitado }, { new: true });
    res.json({ mensaje: 'Estado actualizado', producto });
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al cambiar estado', error });
  }
});

// Editar producto completo
router.put('/editar/:id', async (req, res) => {
  try {
    const producto = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!producto) return res.status(404).json({ mensaje: 'Producto no encontrado' });
    res.json({ mensaje: 'Producto actualizado', producto });
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al actualizar producto', error });
  }
});

// Eliminar producto
router.delete('/:id', async (req, res) => {
  try {
    await Producto.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar producto', error });
  }
});

module.exports = router;
