const express = require('express');
const cors = require('cors');

const JSend = require('./jsend');
const authRouter = require('./routes/auth.router');
const taskRouter = require('./routes/task.router'); // Import task router
const {
    resourceNotFound,
    handleError,
} = require('./controllers/errors.controller');
const { specs, swaggerUi } = require('./docs/swagger');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    return res.json(JSend.success());
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/public', express.static('public'));

// Thiết lập các router\
authRouter.setup(app);
taskRouter.setup(app); // Đăng ký task router

// Handle 404 response
app.use(resourceNotFound);

// Define error-handling middleware last
app.use(handleError);

module.exports = app;
