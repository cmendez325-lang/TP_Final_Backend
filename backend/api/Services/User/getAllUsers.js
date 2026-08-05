import User from "../../Models/User.js";

export default async function getAllUsers() {
    return await User.find();
}
