import User from "../../Models/User.js";

export default async function updateUser(id, datos) {
    return await User.findByIdAndUpdate(id, datos, { new: true });
}