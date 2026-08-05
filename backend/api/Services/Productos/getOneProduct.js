import Producto from "../../Models/Producto.js";

export default async function getOneProduct(id) {
    return await Producto.findById(id);
}