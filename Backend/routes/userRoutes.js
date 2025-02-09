const express = require('express');
const UserController = require('../controllers/userController');
const { authMiddleware, roleMiddleware } = require('../middlewares/auth');
const CONSTTANTS = require('../utils/constants');
var api = express.Router();

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login
 *     description: Allows a user to authenticate and obtain a JWT token.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@admin.com
 *               password:
 *                 type: string
 *                 example: "admin123"
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                  type: boolean
 *                  example: true
 *                 message:
 *                   type: string
 *                   example: "Successful operation"
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                     user:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                           example: "Admin"
 *                         lastName:
 *                           type: string
 *                           example: "Admin"
 *                         email:
 *                           type: string
 *                           example: "admin@admin.com"
 *                         role:
 *                           type: string
 *                           example: "ADMIN"
 *                         birthdate:
 *                           type: string
 *                           format: date
 *                           example: "1990-01-01T00:00:00.000Z"
 *                         active:
 *                           type: boolean
 *                           example: true
 *                         _id:
 *                           type: string
 *                           example: "67a398276efb3edcae93dc0b"
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                           example: "2025-02-05T16:56:07.545Z"
 *                         updatedAt:
 *                           type: string
 *                           format: date-time
 *                           example: "2025-02-05T16:56:07.545Z"
 *                         __v:
 *                           type: number
 *                           example: 0
 *       400:
 *         description: Incorrect input data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                  type: boolean
 *                  example: false
 *                 message:
 *                   type: string
 *                   example: "Incorrect input data"
 *       401:
 *         description: Invalid credentials.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                  type: boolean
 *                  example: false
 *                 message:
 *                   type: string
 *                   example: "Invalid credentials"
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                  type: boolean
 *                  example: false
 *                 message:
 *                   type: string
 *                   example: "User not found"
 *       500:
 *         description: Error processing request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                  type: boolean
 *                  example: false
 *                 message:
 *                   type: string
 *                   example: "Error processing request"
 */
api.post('/login', UserController.login);
/**
 * @swagger
 * /api/users/:
 *   post:
 *     summary: Register a new user
 *     description: Allows you to register a new user in the system.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - lastName
 *               - email
 *               - password
 *               - role
 *               - birthdate
 *             properties:
 *               name:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 example: securepassword123
 *               role:
 *                 type: string
 *                 example: user
 *               birthdate:
 *                 type: string
 *                 format: date
 *                 example: 1990-01-01
 *               image:
 *                 type: string
 *                 example: https://example.com/images/john-doe.jpg
 *               active:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User created successfully
 *                 user:
 *                   type: object
 *                   example: { "name": "John", "lastName": "Doe", "email": "john.doe@example.com", "role": "user", "birthdate": "1990-01-01", "image": "https://example.com/images/john-doe.jpg", "active": true }
 *       400:
 *         description: Incorrect input data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Incorrect input data
 *       401:
 *         description: Access denied. There is no token or it has expired
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Access denied. There is no token or it has expired"
 *       500:
 *         description: Error processing request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error processing request
 */
api.post('/', UserController.register);
/**
 * @swagger
 * /api/users/:
 *   get:
 *     summary: Get user list
 *     description: Allows you to obtain a list of all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: User list successfully obtained
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: John
 *                   lastName:
 *                     type: string
 *                     example: Doe
 *                   email:
 *                     type: string
 *                     example: john.doe@example.com
 *                   role:
 *                     type: string
 *                     example: user
 *                   birthdate:
 *                     type: string
 *                     format: date
 *                     example: 1990-01-01
 *                   image:
 *                     type: string
 *                     example: https://example.com/images/john-doe.jpg
 *                   active:
 *                     type: boolean
 *                     example: true
 *       401:
 *         description: Access denied. There is no token or it has expired
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Access denied. There is no token or it has expired"
 *       500:
 *         description: Error processing request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error processing request"
 */
api.get('/', authMiddleware, roleMiddleware(CONSTTANTS.ROLES.ADMIN), UserController.list);
/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     description: Allows you to obtain a user's data by their ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID to obtain
 *     responses:
 *       200:
 *         description: User successfully obtained
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: John
 *                 lastName:
 *                   type: string
 *                   example: Doe
 *                 email:
 *                   type: string
 *                   example: john.doe@example.com
 *                 role:
 *                   type: string
 *                   example: user
 *                 birthdate:
 *                   type: string
 *                   format: date
 *                   example: 1990-01-01
 *                 image:
 *                   type: string
 *                   example: https://example.com/images/john-doe.jpg
 *                 active:
 *                   type: boolean
 *                   example: true
 *       401:
 *         description: Access denied. There is no token or it has expired
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Access denied. There is no token or it has expired"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not found"
 *       500:
 *         description: Error processing request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error processing request"
 */
api.get('/:id', authMiddleware, roleMiddleware(CONSTTANTS.ROLES.ADMIN), UserController.getById);
/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update user
 *     description: Allows you to update the data of an existing user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *               role:
 *                 type: string
 *                 example: user
 *               birthdate:
 *                 type: string
 *                 format: date
 *                 example: 1990-01-01
 *               image:
 *                 type: string
 *                 example: https://example.com/images/john-doe.jpg
 *               active:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Successful operation"
 *                 user:
 *                   type: object
 *                   example: { "name": "John", "lastName": "Doe", "email": "john.doe@example.com", "role": "user", "birthdate": "1990-01-01", "image": "https://example.com/images/john-doe.jpg", "active": true }
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not found"
 *       500:
 *         description: Error processing request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error processing request"
 */
api.put('/:id', authMiddleware, roleMiddleware(CONSTTANTS.ROLES.ADMIN), UserController.update);
/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete user
 *     description: Allows you to delete an existing user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID to delete
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Successful operation"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not found"
 *       500:
 *         description: Error processing request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error processing request"
 */
api.delete('/:id', authMiddleware, roleMiddleware(CONSTTANTS.ROLES.ADMIN), UserController.remove);

//Exportar el módulo
module.exports = api;
