const jwt = require("jsonwebtoken");
const { sendError } = require("../utils/utils");
const { AUTH_MESSAGES } = require('../utils/constants');

function authMiddleware(req, res, next) {
    // 1️⃣ Obtener el token del header
    const token = req.header("Authorization");

    if (!token) {
        return sendError(res, AUTH_MESSAGES.ERROR_401, 401);
        //return res.status(401).json({ message: "Acceso denegado. No hay token o ha expirado" });
    }

    try {
        // 2️⃣ Verificar el token
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        
        // 3️⃣ Agregar los datos del usuario al `req.user`
        req.user = decoded;
        
        next(); // Continuar con la siguiente función
    } catch (err) {
        return sendError(res, AUTH_MESSAGES.ERROR_401, 401);
        //res.status(401).json({ message: "Acceso denegado. No hay token o ha expirado" });
    }
}

function roleMiddleware(role) {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return sendError(res, AUTH_MESSAGES.ERROR_403, 403);
            //return res.status(403).json({ message: "Acceso denegado" });
        }
        next();
    };
}

module.exports = {authMiddleware, roleMiddleware};
