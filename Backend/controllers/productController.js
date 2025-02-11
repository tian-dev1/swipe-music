const Product = require('../models/product');
const { sendSuccess, sendError } = require('../utils/utils');
const { PRODUCT_MESSAGES } = require('../utils/constants');

// Register a new product
async function register(req, res) {
    try {
        const { name, description, price, stock, category, createdBy } = req.body;

        // Check if the product already exists
        const existingProduct = await Product.findOne({ name });
        if (existingProduct) {
            return sendError(res, PRODUCT_MESSAGES.ERROR_409, 409);
        }

        // Create a new product
        const newProduct = new Product({
            name,
            price,
            description,
            stock,
            category,
            createdBy
        });

        // Save in the database
        const productStored = await newProduct.save();
        return sendSuccess(res, PRODUCT_MESSAGES.SUCCESS_201, { product: productStored }, 201);
    } catch (err) {
        console.error(err);
        return sendError(res, PRODUCT_MESSAGES.ERROR_500);
    }
}
// List all products
async function list(req, res) {
    try {
        const products = await Product.find().populate('category').populate('createdBy', '-password');
        return sendSuccess(res, PRODUCT_MESSAGES.SUCCESS_200, { products });
    } catch (err) {
        console.error(err);
        return sendError(res, PRODUCT_MESSAGES.ERROR_500);
    }
}
// Get product by ID
async function getById(req, res) {
    try {
        const product = await Product.findById(req.params.id).populate('category').populate('createdBy', '-password');
        if (!product) {
            return sendError(res, PRODUCT_MESSAGES.ERROR_404, 404);
        }
        return sendSuccess(res, PRODUCT_MESSAGES.SUCCESS_200, { product });
    } catch (err) {
        console.error(err);
        return sendError(res, PRODUCT_MESSAGES.ERROR_500);
    }
}
// Update a product
async function update(req, res) {
    try {
        const { name, description, price, stock, active, category, createdBy } = req.body;

        // Check if the product already exists
        const product = await Product.findById(req.params.id);
        if (!product) {
            return sendError(res, PRODUCT_MESSAGES.ERROR_404, 404);
        }

        product.name = name;
        product.description = description;
        product.price = price;
        product.stock = stock;
        product.active = active;
        product.category = category;
        product.createdBy = createdBy;
        product.updatedAt = Date.now();

        const productUpdated = await product.save();
        return sendSuccess(res, PRODUCT_MESSAGES.SUCCESS_200, { product: productUpdated });
    } catch (err) {
        console.error(err);
        return sendError(res, PRODUCT_MESSAGES.ERROR_500);
    }
}

module.exports = {
    register, list, getById, update
}