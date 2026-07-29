import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("🔥 Base de datos conectada con éxito");
    console.log("📍 Conectado a la base:", mongoose.connection.name);
    console.log("📍 Host:", mongoose.connection.host);
  } catch (error) {
    console.error("Error al conectar a la BD:", error);
    process.exit(1);
  }
};