const express = require('express');
const ProductController = require('../controllers/productController');

const api = express.Router();

api.post('/', ProductController.register);

api.get('/', ProductController.list);

api.get('/:id', ProductController.getById);

api.put('/:id', ProductController.update);

// Exportamos el módulo
module.exports = api;