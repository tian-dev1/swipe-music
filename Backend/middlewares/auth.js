const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
    // 1️⃣ Obtener el token del header
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ message: "Acceso denegado. No hay token" });
    }

    try {
        // 2️⃣ Verificar el token
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        
        // 3️⃣ Agregar los datos del usuario al `req.user`
        req.user = decoded;
        
        next(); // Continuar con la siguiente función
    } catch (err) {
        res.status(401).json({ message: "Token inválido o expirado" });
    }
}

function roleMiddleware(role) {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).json({ message: "Acceso denegado" });
        }
        next();
    };
}

module.exports = {authMiddleware, roleMiddleware};
