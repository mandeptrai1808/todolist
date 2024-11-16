const express = require('express');
const authController = require('../controllers/auth.controller');
const authenticate = require('../middlewares/authenticate');
const isAdmin = require('../middlewares/isAdmin');
const router = express.Router();

module.exports.setup = (app) => {
    app.use('/api/auth', router);

    /**
     * @swagger
     * /api/auth/register:
     *   post:
     *     summary: Register a new user
     *     description: Register a new user
     *     tags:
     *       - auth
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               username:
     *                 type: string
     *               email:
     *                 type: string
     *               password:
     *                 type: string
     *     responses:
     *       201:
     *         description: User registered successfully
     *       500:
     *         description: Error registering user
     */
    router.post('/register', authController.register);

    /**
     * @swagger
     * /api/auth/login:
     *   post:
     *     summary: Login user
     *     description: Login user and return a token
     *     tags:
     *       - auth
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *               password:
     *                 type: string
     *     responses:
     *       200:
     *         description: Login successful
     *       401:
     *         description: Invalid email or password
     *       500:
     *         description: Error logging in
     */
    router.post('/login', authController.login);

    /**
     * @swagger
     * /api/auth/me:
     *   get:
     *     summary: Get user info
     *     description: Get authenticated user's info
     *     tags:
     *       - auth
     *     responses:
     *       200:
     *         description: User information retrieved successfully
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Error fetching user info
     */
    router.get('/me', authenticate, authController.getUserInfo);

    /**
     * @swagger
     * /api/auth/admin/users:
     *   get:
     *     summary: Get all users (Admin only)
     *     description: Retrieve a list of all users
     *     tags:
     *       - admin
     *     responses:
     *       200:
     *         description: A list of users
     *       403:
     *         description: Access denied
     */
    router.get('/admin/users', authenticate, authController.getAllUsers);

    /**
     * @swagger
     * /api/auth/admin/users/{id}:
     *   delete:
     *     summary: Delete a user by ID (Admin only)
     *     description: Delete a user by their ID
     *     tags:
     *       - admin
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: User ID
     *     responses:
     *       200:
     *         description: User deleted successfully
     *       403:
     *         description: Access denied
     *       404:
     *         description: User not found
     */
    router.delete('/admin/users/:id', authenticate, authController.deleteUser);

    // Cập nhật thông tin người dùng theo ID (dành cho admin)
    /**
     * @swagger
     * /api/auth/admin/users/{id}:
     *   put:
     *     summary: Update a user by ID (Admin only)
     *     description: Update a user's details by their ID
     *     tags:
     *       - admin
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: User ID
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               username:
     *                 type: string
     *               email:
     *                 type: string
     *               role:
     *                 type: string
     *                 enum: [user, admin]
     *     responses:
     *       200:
     *         description: User updated successfully
     *       403:
     *         description: Access denied
     *       404:
     *         description: User not found
     */
    router.put('/admin/users/:id', authenticate, authController.updateUser);

    router.put('/admin/usersbyid/:id', authenticate, authController.updateUserById);

    // Cấm các phương thức khác
    router.all('*', (req, res) => {
        res.status(405).json({ message: "Method not allowed" });
    });
};

