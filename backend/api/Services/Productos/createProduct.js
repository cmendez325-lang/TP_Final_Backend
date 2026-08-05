import Producto from "../../Models/Producto.js";

export default async function createProduct(datos) {
    const nuevoProducto = new Producto(datos);
    return await nuevoProducto.save();
}