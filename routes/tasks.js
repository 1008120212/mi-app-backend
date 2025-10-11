const express = require('express');
const router = express.Router();
const Task = require('../models/task');

// Cuando alguien pida la URL GET /api/tasks/, esto se ejecutará
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener tareas' });
    }
});

// Cuando alguien envíe datos a la URL POST /api/tasks/, esto se ejecutará
router.post('/', async (req, res) => {
    const newTask = new Task({
        title: req.body.title
    });
    try {
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (err) {
        res.status(400).json({ message: 'Error al crear la tarea' });
    }
});

module.exports = router;
