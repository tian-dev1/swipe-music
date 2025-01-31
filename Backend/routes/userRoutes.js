const express = require('express');
const UserController = require('../controllers/userController');
var api = express.Router();

api.post('/login', UserController.login);
api.post('/register', UserController.register);
api.get('/list', UserController.list);
api.put('/update/:id', UserController.update);
api.delete('/delete/:id', UserController.remove);


//Exportar el módulo
module.exports = api;
