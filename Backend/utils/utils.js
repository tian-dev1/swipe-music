const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

function sendSuccess(res, message, data = {}, statusCode = 200) {
    return res.status(statusCode).json({
        success: true,
        message,
        data
    });
}

function sendError(res, message, statusCode = 500) {
    return res.status(statusCode).json({
        success: false,
        message
    });
}

// Función para validar campos de entrada en el login
function validateLoginInput(email, password) {
    if (!email || !password) {
        return { valid: false};
    }
    return { valid: true };
}

// Función para generar el token JWT (separada para mejor organización)
function generateToken(user) {
    return jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
}

// Función para sanitizar el objeto usuario (eliminar campos sensibles)
function sanitizeUser(user) {
    const { password, ...rest } = user.toObject(); // Excluir la contraseña
    return rest;
}

function validateRegisterInput(name, lastName, email, password, role, birthdate) {
    if (!name || !lastName || !email || !password || !role || !birthdate) {
        return { valid: false, message: "Todos los campos son obligatorios" };
    }
    return { valid: true };
}

async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}


module.exports = { sendSuccess, sendError, validateLoginInput, generateToken, sanitizeUser, validateRegisterInput, hashPassword };