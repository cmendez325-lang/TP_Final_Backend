import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import authRouter from './routers/authRouter.js';
import userRouter from './routers/userRouter.js';
import productoRouter from './routers/productoRouter.js';
import carritoRouter from './routers/carritoRouter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use('/api/auth', authRouter);
app.use('/api/usuarios', userRouter);
app.use('/api/productos', productoRouter);
app.use('/api/carrito', carritoRouter);

export default app;
