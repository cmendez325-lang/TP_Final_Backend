import User from '../Models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import createUser from '../Services/User/createUser.js';

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const usuarioEncontrado = await User.findOne({ email });
        if (!usuarioEncontrado) {
            return res.status(400).json({ mensaje: 'Usuario o contraseña inválidos' });
        }

        const esPasswordValida = await bcrypt.compare(password, usuarioEncontrado.password);
        if (!esPasswordValida) {
            return res.status(400).json({ mensaje: 'Usuario o contraseña inválidos' });
        }

        const token = jwt.sign(
            {
                id: usuarioEncontrado._id,
                rol: usuarioEncontrado.rol
            },
            process.env.JWT_SECRET || 'secreto_super_seguro',
            { expiresIn: '1d' }
        );

        res.status(200).json({
            mensaje: 'Inicio de sesión exitoso',
            token,
            usuario: {
                id: usuarioEncontrado._id,
                nombre: usuarioEncontrado.nombre,
                email: usuarioEncontrado.email,
                rol: usuarioEncontrado.rol,
                ciudad: usuarioEncontrado.ciudad,
                pais: usuarioEncontrado.pais,
                edad: usuarioEncontrado.edad,
                direccion: usuarioEncontrado.direccion
            }
        });

    } catch (error) {
        res.status(500).json({ mensaje: 'Error al iniciar sesión', error: error.message });
    }
};

export const register = async (req, res) => {
    try {
        const { nombre, email, password, rol, ciudad, pais, edad, direccion } = req.body;

        // Validación de contraseña también en el backend, para no depender solo del frontend
        if (!password || password.length < 6) {
            return res.status(400).json({ mensaje: 'La contraseña debe tener al menos 6 caracteres.' });
        }
        if (!/\d/.test(password)) {
            return res.status(400).json({ mensaje: 'La contraseña debe incluir al menos un número.' });
        }
        if (!/[a-zA-Z]/.test(password)) {
            return res.status(400).json({ mensaje: 'La contraseña debe incluir al menos una letra.' });
        }

        const usuarioExistente = await User.findOne({ email });
        if (usuarioExistente) {
            return res.status(400).json({ mensaje: 'El correo electrónico ya está registrado.' });
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHasheada = await bcrypt.hash(password, salt);

        const nuevoUsuario = await createUser({
            nombre,
            email,
            password: passwordHasheada,
            rol: rol || 'user',
            ciudad,
            pais,
            edad,
            direccion
        });

        res.status(201).json({
            mensaje: '¡Registro exitoso!',
            usuario: {
                id: nuevoUsuario._id,
                nombre: nuevoUsuario.nombre,
                email: nuevoUsuario.email,
                rol: nuevoUsuario.rol,
                ciudad: nuevoUsuario.ciudad,
                pais: nuevoUsuario.pais,
                edad: nuevoUsuario.edad,
                direccion: nuevoUsuario.direccion
            }
        });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al registrar el usuario', error: error.message });
    }
};