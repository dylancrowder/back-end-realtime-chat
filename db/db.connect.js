import mongoose from "mongoose";
import dotenv from "dotenv";


// Cargar las variables de entorno desde el archivo .env
dotenv.config({ path: "./.env.db" });

// Obtener la URI de conexión desde las variables de entorno
const URI = "mongodb+srv://devdylancrowder:dilan_07@cluster0.pbvemm9.mongodb.net/";

// Función para inicializar la conexión a MongoDB
export const initMongo = async () => {
    try {
        // Conectar a la base de datos utilizando la URI
        await mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Base de datos conectada correctamente");
    } catch (error) {
        // Manejar errores de conexión
        console.error("Error al intentar conectarse a la base de datos:", error);
    }
};
