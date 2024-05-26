// authMiddleware.js
import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  // Obtén el token del encabezado de la solicitud
  const token = req.headers.authorization;
console.log("este es el token",token);
  // Verifica si el token existe
  if (!token) {
    return res.status(401).json({ error: "Acceso no autorizado" });
  }

  try {
    // Verifica el token usando la clave secreta (deberías almacenar esto de manera segura)
    const decoded = jwt.verify(token, "miClaveSecreta");

    // Añade la información del usuario al objeto de solicitud
    req.user = decoded;

    // Llama al siguiente middleware
    next();
  } catch (error) {
    // Maneja errores de token inválido
    return res.status(401).json({ error: "Acceso no autorizado" });
  }
};

export default authMiddleware;
