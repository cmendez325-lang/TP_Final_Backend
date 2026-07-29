import express from 'express';
import cors from 'cors';
import productoRouter from './routers/productoRouter.js';
import userRouter from './routers/userRouter.js';
import carritoRouter from './routers/carritoRouter.js';
import authRouter from './routers/authRouter.js'; 

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());

// Rutas principales de la API
app.use('/api/productos', productoRouter);
app.use('/api/users', userRouter);
app.use('/api/carrito', carritoRouter);
app.use('/api/auth', authRouter); 

export default app;