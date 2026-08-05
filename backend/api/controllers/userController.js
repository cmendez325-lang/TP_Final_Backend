import createUser from "../Services/User/createUser.js";
import getAllUsers from '../Services/User/getAllUsers.js';
import getOneUser from '../Services/User/getOneUser.js';
import updateUser from '../Services/User/updateUser.js';
import deleteUser from '../Services/User/deleteUser.js';
import updateUserRole from '../Services/User/updateUserRole.js';

export async function getUsers(req, res) {
    try {
        const usuarios = await getAllUsers();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener los usuarios", error: error.message });
    }
}

export async function getUser(req, res) {
    try {
        const usuario = await getOneUser(req.params.id);
        if (!usuario) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener el usuario", error: error.message });
    }
}

export async function create(req, res) {
    try {
        const nuevoUsuario = await createUser(req.body);
        res.status(201).json(nuevoUsuario);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al crear el usuario", error: error.message });
    }
}

export async function update(req, res) {
    try {
        const usuarioActualizado = await updateUser(req.params.id, req.body);
        if (!usuarioActualizado) {
            return res.status(404).json({ mensaje: "Usuario no encontrado para actualizar" });
        }
        res.status(200).json(usuarioActualizado);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar el usuario", error: error.message });
    }
}

// GET /perfil - Devuelve los datos del usuario logueado
export async function getMiPerfil(req, res) {
    try {
        const usuario = await getOneUser(req.usuario.id);
        if (!usuario) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener tu perfil", error: error.message });
    }
}

// PUT /perfil - Permite a cualquier usuario logueado editar SUS PROPIOS datos.
// No permite tocar rol ni password desde acá (por seguridad).
export async function updateMiPerfil(req, res) {
    try {
        const { nombre, email, ciudad, pais, edad, direccion } = req.body;

        const datosPermitidos = { nombre, email, ciudad, pais, edad, direccion };

        const usuarioActualizado = await updateUser(req.usuario.id, datosPermitidos);
        if (!usuarioActualizado) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        res.status(200).json({
            mensaje: "Perfil actualizado correctamente",
            usuario: usuarioActualizado
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ mensaje: "Ese email ya está en uso por otra cuenta." });
        }
        res.status(500).json({ mensaje: "Error al actualizar tu perfil", error: error.message });
    }
}

// PUT /:id/rol - Cambia el rol de un usuario (admin, vendedor, user)
export async function changeRole(req, res) {
    try {
        const { rol } = req.body;
        const rolesValidos = ['admin', 'vendedor', 'user'];

        if (!rolesValidos.includes(rol)) {
            return res.status(400).json({ mensaje: "Rol inválido. Debe ser admin, vendedor o user." });
        }

        if (req.params.id === req.usuario.id && rol !== 'admin') {
            return res.status(400).json({ mensaje: "No podés quitarte tu propio rol de administrador." });
        }

        const usuarioActualizado = await updateUserRole(req.params.id, rol);
        if (!usuarioActualizado) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        res.status(200).json(usuarioActualizado);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar el rol", error: error.message });
    }
}

export async function remove(req, res) {
    try {
        if (req.params.id === req.usuario.id) {
            return res.status(400).json({ mensaje: "No podés eliminar tu propia cuenta desde acá." });
        }

        const usuarioEliminado = await deleteUser(req.params.id);
        if (!usuarioEliminado) {
            return res.status(404).json({ mensaje: "Usuario no encontrado para eliminar" });
        }
        res.status(200).json({ mensaje: "Usuario eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar el usuario", error: error.message });
    }
}
