const Category = require('../models/category');
const { sendSuccess, sendError } = require('../utils/utils');

const { CATEGORY_MESSAGES } = require('../utils/constants');

// Register a new category
async function register(req, res) {
    try {
        const { name, description, createdBy } = req.body;

        // Check if the category already exists
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return sendError(res, CATEGORY_MESSAGES.ERROR_409, 409);
        }

        // Create a new category
        const newCategory = new Category({
            name,
            description,
            createdBy
        });

        // Save in the database
        const categoryStored = await newCategory.save();
        return sendSuccess(res, CATEGORY_MESSAGES.SUCCESS_201, { category: categoryStored }, 201);
    } catch (err) {
        console.error(err);
        return sendError(res, CATEGORY_MESSAGES.ERROR_500);
    }
}
// List all categories
async function list(req, res) {
    try {
        const categories = await Category.find();
        return sendSuccess(res, CATEGORY_MESSAGES.SUCCESS_200, { categories });
    } catch (err) {
        console.error(err);
        return sendError(res, CATEGORY_MESSAGES.ERROR_500);
    }
    
}
// Get a category by id
async function getById(req, res) {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return sendError(res, CATEGORY_MESSAGES.ERROR_404, 404);
        }
        return sendSuccess(res, CATEGORY_MESSAGES.SUCCESS_200, { category });
    } catch (err) {
        console.error(err);
        return sendError(res, CATEGORY_MESSAGES.ERROR_500);
    }
}
// Update a category
async function update(req, res) {
    try {
        const { name, description, createdBy, active } = req.body;

        const category = await Category.findById(req.params.id);
        if (!category) {
            return sendError(res, CATEGORY_MESSAGES.ERROR_404, 404);
        }

        category.name = name;
        category.description = description;
        category.createdBy = createdBy;
        category.active = active;
        category.updatedAt = Date.now();

        const categoryUpdated = await category.save();
        return sendSuccess(res, CATEGORY_MESSAGES.SUCCESS_200, { category: categoryUpdated });
    } catch (err) {
        console.error(err);
        return sendError(res, CATEGORY_MESSAGES.ERROR_500);
    }
}

module.exports = {
    register, list, getById, update
}