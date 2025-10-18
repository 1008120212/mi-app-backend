// Importamos las librerías que instalamos
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// Esta línea es crucial para cargar las variables del archivo .env
require('dotenv').config();

// Creamos nuestra aplicación de servidor
const app = express();
const PORT = process.env.PORT || 5000;

// Configuramos los middlewares
app.use(cors()); // Habilita la comunicación entre servidores
app.use(express.json()); // Permite al servidor entender el formato JSON
// Intentamos conectar a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Conectado a MongoDB Atlas'))
  .catch((err) => console.error('❌ Error de conexión:', err));

// Usamos las rutas definidas en otro archivo
//const tasksRouter = require('./routes/tasks');
//app.use('/api/tasks', tasksRouter);

// Nueva ruta para productos
const productosRoutes = require('./routes/productos');
app.use('/api/productos', productosRoutes);



// Ponemos el servidor a escuchar peticiones
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
