// authMiddleware.js
import jwt from 'jsonwebtoken';
import User from '../Models/User.js';

// Verifica el token JWT y busca el usuario real en la DB
export const estaAutenticado = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: "No autorizado. Falta el token." });
        }

        const token = authHeader.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secreto_super_seguro');

        const usuario = await User.findById(decoded.id);
        if (!usuario) {
            return res.status(401).json({ error: "No autorizado. Usuario no encontrado." });
        }

        req.usuario = { id: usuario._id, rol: usuario.rol };
        next();

    } catch (error) {
        return res.status(401).json({ error: "Token inválido o expirado." });
    }
};

// Verifica si es Administrador (se usa DESPUÉS de estaAutenticado)
export const esAdmin = (req, res, next) => {
    if (req.usuario?.rol === 'admin') {
        next();
    } else {
        res.status(403).json({ error: "Acceso denegado. Se requiere rol de Administrador." });
    }
};

// Verifica Vendedor o Admin (se usa DESPUÉS de estaAutenticado)
export const verificarVendedorOAdmin = (req, res, next) => {
    if (req.usuario?.rol === 'admin' || req.usuario?.rol === 'vendedor') {
        next();
    } else {
        res.status(403).json({ error: "Acceso denegado. Se requiere cuenta de Vendedor o Administrador." });
    }
};