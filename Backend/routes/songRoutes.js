const express = require('express');
const SongController = require('../controllers/songController');
const { authMiddleware, roleMiddleware } = require('../middlewares/auth');
var api = express.Router();

api.post('/register', authMiddleware, roleMiddleware("ADMIN"), SongController.register);
api.get('/list', authMiddleware, roleMiddleware("ADMIN"), SongController.list);
//Exportar el módulo
module.exports = api;