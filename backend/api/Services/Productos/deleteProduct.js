import Producto from "../../Models/Producto.js";

export default async function deleteProduct(id) {
    return await Producto.findByIdAndDelete(id);
}