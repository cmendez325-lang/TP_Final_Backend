import User from "../../Models/User.js";

export default async function updateUserRole(id, nuevoRol) {
    return await User.findByIdAndUpdate(
        id,
        { rol: nuevoRol },
        { new: true }
    ).select('-password');
}
