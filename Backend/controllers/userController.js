const bcrypt = require("bcryptjs");
const User = require('../models/user');
const { sendSuccess, sendError, generateToken, sanitizeUser, hashPassword } = require('../utils/utils');
const { USER_MESSAGES } = require('../utils/constants');
const path = require('path');
const fs = require('fs');
// Login
async function login(req, res) {
    try {
        const { email, password } = req.body;
        // Buscar usuario por email
        const user = await User.findOne({ email, active: true });
        if (!user) {
            return sendError(res, USER_MESSAGES.ERROR_404, 404);
        }
        // Comparar contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return sendError(res, USER_MESSAGES.ERROR_401, 401);
        }
        // Generar token JWT
        const token = generateToken(user);
        return sendSuccess(res, USER_MESSAGES.SUCCESS_200, { token, user: sanitizeUser(user) });
    } catch (err) {
        console.error(err);
        return sendError(res, USER_MESSAGES.ERROR_500);
    }
}
// Register a new user
async function register(req, res) {
    try {
        const { name, lastName, email, password, role, birthdate, imagen, list, active } = req.body;

        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return sendError(res, USER_MESSAGES.ERROR_409, 409);
        }

        // Encriptar la contraseña antes de guardarla
        const hashedPassword = await hashPassword(password);

        // Crear un nuevo usuario
        const newUser = new User({
            name,
            lastName,
            email,
            password: hashedPassword,
            role,
            birthdate,
            imagen,
            list,
            active
        });

        // Guardar en la base de datos
        const userStored = await newUser.save();
        return sendSuccess(res, USER_MESSAGES.SUCCESS_201, { user: sanitizeUser(userStored) }, 201);
    } catch (err) {
        console.error(err);
        return sendError(res, USER_MESSAGES.ERROR_500);
    }
}
// List all users
async function list(req, res) {
    try {
        const users = await User.find().select("-password");
        return sendSuccess(res, USER_MESSAGES.SUCCESS_200, { users });
    } catch (err) {
        console.error(err);
        return sendError(res, USER_MESSAGES.ERROR_500);
    }
}
// Get a user by id
async function getById(req, res) {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) {
            return sendError(res, USER_MESSAGES.ERROR_404, 404);
        }
        return sendSuccess(res, USER_MESSAGES.SUCCESS_200, { user });
    } catch (err) {
        console.error(err);
        return sendError(res, USER_MESSAGES.ERROR_500);
    }
}
// Update a user
async function update(req, res) {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return sendError(res, USER_MESSAGES.ERROR_404, 404);
        }
        
        // Recorrer las claves del body y actualizar solo las que existen
        Object.keys(req.body).forEach((key) => {
            if (req.body[key] !== undefined) {
                user[key] = req.body[key];
            }
        });
        
        // Actualizar la imagen si se ha subido una nueva
        if (req.file) {
            // Eliminar la imagen anterior si existe
            if (user.image) {
                fs.unlinkSync(path.join(__dirname, '../uploads/users', user.image));
            }
            user.image = req.file.filename;
        }

        user.updatedAt = Date.now();

        await user.save();
        return sendSuccess(res, USER_MESSAGES.SUCCESS_200, { user: sanitizeUser(user) });
    } catch (err) {
        console.error(err);
        return sendError(res, USER_MESSAGES.ERROR_500);
    }
}
// Delete a user
async function remove(req, res) {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return sendError(res, USER_MESSAGES.ERROR_404, 404);
        }
        return sendSuccess(res, USER_MESSAGES.SUCCESS_200, { user });
    } catch (err) {
        console.error(err);
        return sendError(res, USER_MESSAGES.ERROR_500);
    }
}

module.exports = {
    login, register, list, getById, update, remove
}