import Producto from "../../Models/Producto.js";

export default async function getAllProducts() {
    return await Producto.find();
}