const express = require('express');
const taskController = require('../controllers/task.controller');
const authenticate = require('../middlewares/authenticate'); // Middleware xác thực

const router = express.Router();

module.exports.setup = (app) => {
    app.use('/api/tasks', router);

    /**
     * @swagger
     * /api/tasks:
     *   get:
     *     summary: Get all tasks
     *     description: Retrieve a list of all tasks
     *     tags:
     *       - tasks
     *     responses:
     *       200:
     *         description: A list of tasks
     *       401:
     *         description: Unauthorized
     */
    router.get('/', authenticate, taskController.getAllTasks);

     /**
     * @swagger
     * /api/tasks/my-tasks:
     *   get:
     *     summary: Get all tasks for the authenticated user
     *     description: Retrieve a list of all tasks for the logged-in user
     *     tags:
     *       - tasks
     *     responses:
     *       200:
     *         description: A list of tasks for the user
     *       401:
     *         description: Unauthorized
     */
     router.get('/my-tasks', authenticate, taskController.getTasksByUserId);


    /**
     * @swagger
     * /api/tasks:
     *   post:
     *     summary: Create a new task
     *     description: Create a new task
     *     tags:
     *       - tasks
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               title:
     *                 type: string
     *               description:
     *                 type: string
     *               priority:
     *                 type: boolean
     *     responses:
     *       201:
     *         description: Task created successfully
     *       500:
     *         description: Error creating task
     */
    router.post('/', authenticate, taskController.createTask);

    /**
     * @swagger
     * /api/tasks/{id}:
     *   get:
     *     summary: Get task by ID
     *     description: Retrieve a task by its ID
     *     tags:
     *       - tasks
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: Task ID
     *     responses:
     *       200:
     *         description: A task
     *       404:
     *         description: Task not found
     */
    router.get('/:id', authenticate, taskController.getTaskById);

    /**
     * @swagger
     * /api/tasks/{id}:
     *   put:
     *     summary: Update a task
     *     description: Update task by its ID
     *     tags:
     *       - tasks
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: Task ID
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               title:
     *                 type: string
     *               description:
     *                 type: string
     *               status:
     *                 type: string
     *                 enum: [pending, completed]
     *               priority:
     *                 type: boolean
     *     responses:
     *       200:
     *         description: Task updated successfully
     *       404:
     *         description: Task not found
     */
    router.put('/:id', authenticate, taskController.updateTask);

    /**
     * @swagger
     * /api/tasks/{id}:
     *   delete:
     *     summary: Delete a task
     *     description: Delete task by its ID
     *     tags:
     *       - tasks
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: Task ID
     *     responses:
     *       200:
     *         description: Task deleted successfully
     *       404:
     *         description: Task not found
     */
    router.delete('/:id', authenticate, taskController.deleteTask);
   
    // Cấm tất cả các phương thức khác cho endpoint /api/tasks
    router.all('*', (req, res) => {
        res.status(405).json({ message: "Method not allowed" });
    });
};
