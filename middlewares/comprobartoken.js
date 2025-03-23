import jwt from 'jsonwebtoken';

const secretKey = process.env.AUTH_TOKEN_SECRET;

export const verificarToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Token no proporcionado" });
    }

    // Verificar el token
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Token no válido o expirado" });
      }

      req.user = decoded;
      next();
    });
  } catch (error) {
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};
