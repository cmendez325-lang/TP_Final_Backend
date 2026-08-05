import User from '../../Models/User.js';

export default async function createUser(datos) {
  const nuevoUsuario = new User(datos);
  return await nuevoUsuario.save();
}