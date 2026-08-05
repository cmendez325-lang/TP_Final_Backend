import getAllUsers from "../Services/Usuarios/getAllUsers.js";
import updateUserRole from "../Services/Usuarios/updateUserRole.js";
import deleteUser from "../Services/Usuarios/deleteUser.js";

// GET: Listar todos los usuarios (sin password)
export async function getUsers(req, res) {
    try {
        const usuarios = await getAllUsers();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener los usuarios", error: error.message });
    }
}

// PUT: Cambiar el rol de un usuario (admin, vendedor, user)
export async function changeUserRole(req, res) {
    try {
        const { rol } = req.body;
        const rolesValidos = ['admin', 'vendedor', 'user'];

        if (!rolesValidos.includes(rol)) {
            return res.status(400).json({ mensaje: "Rol inválido. Debe ser admin, vendedor o user." });
        }

        // Evita que un admin se saque su propio rol de admin por error y quede sin acceso
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

// DELETE: Eliminar un usuario
export async function removeUser(req, res) {
    try {
        // Evita que un admin se elimine a sí mismo por error
        if (req.params.id === req.usuario.id) {
            return res.status(400).json({ mensaje: "No podés eliminar tu propia cuenta desde acá." });
        }

        const usuarioEliminado = await deleteUser(req.params.id);
        if (!usuarioEliminado) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        res.status(200).json({ mensaje: "Usuario eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar el usuario", error: error.message });
    }
}
