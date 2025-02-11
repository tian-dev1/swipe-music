const { check, validationResult } = require('express-validator');
const { sendError } = require('../utils');
const { USER_MESSAGES } = require('../constants');

const validateLogin = [
    check('email').isEmail().withMessage('Please enter a valid email'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return sendError(res, USER_MESSAGES.ERROR_400, 400, { errors: errors.array() });
        }
        next();
    }
];

const validateRegister = [
    check('name').not().isEmpty().withMessage('Name is required'),
    check('lastName').not().isEmpty().withMessage('Last name is required'),
    check('email').isEmail().withMessage('Please enter a valid email'),
    check('password').isLength({ min: 6, max: 15 }).withMessage('Password must be at least 6 characters long'),
    check('birthdate').isDate().withMessage('Please enter a valid birthdate'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return sendError(res, USER_MESSAGES.ERROR_400, 400, { errors: errors.array() });
        }
        next();
    }
];

module.exports = {
    validateLogin,
    validateRegister
};