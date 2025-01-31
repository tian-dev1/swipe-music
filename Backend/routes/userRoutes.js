const express = require('express');
const UserController = require('../controllers/userController');
const { authMiddleware, roleMiddleware } = require('../middlewares/auth');
var api = express.Router();

api.post('/login', UserController.login);
// Ruta protegida
api.post('/register', authMiddleware, roleMiddleware("ADMIN"), UserController.register);
api.get('/list', UserController.list);
api.put('/update/:id', UserController.update);
api.delete('/delete/:id', UserController.remove);


//Exportar el módulo
module.exports = api;
