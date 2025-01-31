const User = require('../models/user');

// Register a new user
async function register(req, res) {
    try {
        const { name, lastName, email, password, role, status, imagen, list } = req.body;

        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "El usuario ya existe" });
        }

        // Crear un nuevo usuario
        const newUser = new User({name, lastName, email, password, role, status, imagen, list});
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
    register, list, update, remove
}