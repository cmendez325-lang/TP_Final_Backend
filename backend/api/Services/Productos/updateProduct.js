import Producto from "../../Models/Producto.js";

export default async function updateProduct(id, datos) {
    return await Producto.findByIdAndUpdate(id, datos, { new: true });
}