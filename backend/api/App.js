import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import productoRouter from './routers/productoRouter.js';
import userRouter from './routers/userRouter.js';
import carritoRouter from './routers/carritoRouter.js';
import authRouter from './routers/authRouter.js';
import ordenRouter from './routers/ordenRouter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());

// Servir la carpeta de imágenes subidas
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rutas principales de la API
app.use('/api/productos', productoRouter);
app.use('/api/users', userRouter);
app.use('/api/carrito', carritoRouter);
app.use('/api/auth', authRouter);
app.use('/api/orders', ordenRouter);

export default app;