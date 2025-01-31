const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require('../models/user');

// Login
async function login(req, res) {
    try{
        const { email, password } = req.body;
        //buscar usuario por email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Contraseña incorrecta" });
        }

        //Generar token JWT
        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role }, 
            process.env.JWT_SECRET, 
            { expiresIn: "7d" } // Token válido por 7 días
        );

        res.json({ message: "Login exitoso", token, user });
    
    
    
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error al iniciar sesión" });
    }
}
// Register a new user
async function register(req, res) {
    try {
        const { name, lastName, email, password, role, status, imagen, list } = req.body;

        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "El usuario ya existe" });
        }
        
        // Encriptar la contraseña antes de guardarla
        const salt = await bcrypt.genSalt(10); // Generar "sal" para hacer más segura la encriptación
        const hashedPassword = await bcrypt.hash(password, salt);
        
        // Crear un nuevo usuario
        const newUser = new User({name, lastName, email, password: hashedPassword, role, status, imagen, list});
        console.log("newUser", newUser);
        // Guardar en la base de datos
        const userStored = await newUser.save();

        res.status(201).json({ message: "Usuario Creado", user: userStored });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error al procesar la solicitud" });
    }
}
// List all users
async function list(req, res) {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error al procesar la solicitud" });
    }
}
// Update a user
async function update(req, res) {
    try {
        const { name, lastName, email, password, role, ststus, imagen, list } = req.body;
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        
        // if (name !== undefined) user.name = name;
        // if (lastName !== undefined) user.lastName = lastName;
        // if (email !== undefined) user.email = email;
        // if (password !== undefined) user.password = password;
        // if (role !== undefined) user.role = role;
        // if (imagen !== undefined) user.imagen = imagen;
        // if (list !== undefined) user.list = list;

        // Recorrer las claves del body y actualizar solo las que existen
        Object.keys(req.body).forEach((key) => {
            if (req.body[key] !== undefined) {
                user[key] = req.body[key];
            }
        });

        await user.save();
        res.json({ message: "Usuario actualizado", user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error al procesar la solicitud" });
    }
}
// Delete a user
async function remove(req, res) {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.json({ message: "Usuario eliminado correctamente", user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error al eliminar el usuario" });
        }
}

module.exports = {
    login, register, list, update, remove
}