import User from "../../Models/User.js";

export default async function getOneUser(id) {
    return await User.findById(id);
}