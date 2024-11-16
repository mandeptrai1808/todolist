require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Import cors
const app = require('./src/app');

// Cấu hình CORS - cho phép tất cả các nguồn gốc
app.use(cors());

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});


