import app from './App.js';
import { connectDB } from './db.js';
import 'dotenv/config'; // O dotenv.config() arriba del todo

const PORT = process.env.PORT || 4000;

// Conectar a MongoDB y luego arrancar el servidor
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
});