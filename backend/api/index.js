import app from './App.js';
import { connectDB } from './db.js';
import 'dotenv/config';

const PORT = process.env.PORT || 4000;


connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
});