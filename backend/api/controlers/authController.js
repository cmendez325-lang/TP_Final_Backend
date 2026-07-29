import User from '../Models/User.js';   // Asegurate de importar tu modelo
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;

        // 1. Verificar que no exista ya un usuario con ese email
        const usuarioExistente = await User.findOne({ email });
        if (usuarioExistente) {
            return res.status(400).json({ mensaje: 'El usuario ya existe' });
        }

        // 2. Hashear la contraseña antes de guardarla
        const salt = await bcrypt.genSalt(10);
        const passwordHasheada = await bcrypt.hash(password, salt);

        // 3. Crear y guardar el nuevo usuario
        const nuevoUsuario = new User({
            nombre,
            email,
            password: passwordHasheada
        });
        await nuevoUsuario.save();

        // 4. Responder (sin devolver la contraseña)
        return res.status(201).json({
            mensaje: 'Usuario registrado correctamente',
            usuario: {
                id: nuevoUsuario._id,
                nombre: nuevoUsuario.nombre,
                email: nuevoUsuario.email
            }
        });

    } catch (error) {
        return res.status(500).json({ mensaje: 'Error al registrar usuario', error: error.message });
    }
};

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

        // 3. Crear el token JWT (asegurate de tener una clave secreta en tu .env)
        const token = jwt.sign(
            { id: usuarioEncontrado._id }, 
            process.env.JWT_SECRET || 'secreto_super_seguro', 
            { expiresIn: '1d' }
        );

        // 4. Enviar la respuesta con el token
        res.status(200).json({
            mensaje: 'Inicio de sesión exitoso',
            token,
            usuario: {
                id: usuarioEncontrado._id,
                nombre: usuarioEncontrado.nombre,
                email: usuarioEncontrado.email
            }
        });

    } catch (error) {
        res.status(500).json({ mensaje: 'Error al iniciar sesión', error: error.message });
    }
};