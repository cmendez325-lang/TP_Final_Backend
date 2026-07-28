import User from '../Models/User.js'; 
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Buscar si el usuario existe por su email
        const usuarioEncontrado = await User.findOne({ email });
        if (!usuarioEncontrado) {
            return res.status(400).json({ mensaje: 'Usuario o contraseña inválidos' });
        }

        // 2. Comparar la contraseña ingresada con la almacenada (hasheada)
        const esPasswordValida = await bcrypt.compare(password, usuarioEncontrado.password);
        if (!esPasswordValida) {
            return res.status(400).json({ mensaje: 'Usuario o contraseña inválidos' });
        }

        // 3. Crear el token JWT INCLUYENDO EL ROL (Aquí va el primer ajuste)
        const token = jwt.sign(
            { 
                id: usuarioEncontrado._id, 
                rol: usuarioEncontrado.rol // <-- Guardamos el rol dentro del token
            }, 
            process.env.JWT_SECRET || 'secreto_super_seguro', 
            { expiresIn: '1d' }
        );

        // 4. Enviar la respuesta con el token y el rol en el objeto usuario (Aquí va el segundo ajuste)
        res.status(200).json({
            mensaje: 'Inicio de sesión exitoso',
            token,
            usuario: {
                id: usuarioEncontrado._id,
                nombre: usuarioEncontrado.nombre,
                email: usuarioEncontrado.email,
                rol: usuarioEncontrado.rol // <-- Devolvemos el rol para que la interfaz lo reconozca
            }
        });

    } catch (error) {
        res.status(500).json({ mensaje: 'Error al iniciar sesión', error: error.message });
    }
};