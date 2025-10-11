const mongoose = require('mongoose');

// Definimos cómo se verán los datos de una "tarea" en la base de datos
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

// Exportamos el modelo para poder usarlo en otros archivos
module.exports = mongoose.model('Task', taskSchema);
