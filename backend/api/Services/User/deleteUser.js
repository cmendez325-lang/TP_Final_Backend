import User from "../../Models/User.js";

export default async function deleteUser(id) {
    return await User.findByIdAndDelete(id);
}
