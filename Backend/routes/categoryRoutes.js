const express = require('express');
const CategoryController = require('../controllers/categoryController');

var api = express.Router();

api.post('/', CategoryController.register);

api.get('/', CategoryController.list);

api.get('/:id', CategoryController.getById);

api.put('/:id', CategoryController.update);

// Exportar el módulo
module.exports = api;